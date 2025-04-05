import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom/vitest"
import { CreateNewVideo } from "../CreateNewVideo"
import { useToast } from "@/hooks/use-toast"

// Mock the useToast hook
vi.mock("@/hooks/use-toast", () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn(),
  })),
}))

describe("CreateNewVideo", () => {
  const mockToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useToast as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      toast: mockToast,
    }));
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CreateNewVideo />
      </BrowserRouter>
    )
  }

  const createTestFile = () => {
    return new File(['test content'], 'test.pptx', {
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    });
  };

  it("renders without crashing", () => {
    renderComponent()
  })

  it("displays correct breadcrumb navigation", () => {
    renderComponent()
    
    const homeLink = screen.getByText("Home")
    const createLink = screen.getByText("Create New Video")
    expect(homeLink.getAttribute("href")).toBe("/")
    expect(createLink.getAttribute("href")).toBe("/create")
  })

  it("renders components in correct layout with initial disabled state", () => {
    renderComponent()
    
    // DropZone is rendered
    const dropzone = screen.getByTestId("dropzone")
    expect(dropzone).toBeInTheDocument()

    // MetadataForm is rendered with disabled state
    const titleInput = screen.getByLabelText("Project Title")
    const descriptionInput = screen.getByLabelText("Description")
    const templateSection = screen.getByText("Template")
    const tagsSection = screen.getByText("Tags")
    const submitButton = screen.getByRole("button", { name: /Upload a presentation first/i })
    
    expect(titleInput).toBeDisabled()
    expect(descriptionInput).toBeDisabled()
    expect(submitButton).toBeDisabled()
    
    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(templateSection).toBeInTheDocument()
    expect(tagsSection).toBeInTheDocument()

    // Initial slides state
    expect(screen.getByText(/Upload a presentation to see slides/i)).toBeInTheDocument()
  })

  it("handles file upload and enables form", async () => {
    renderComponent()
    
    const file = createTestFile();
    const dropzone = screen.getByTestId("dropzone")

    // Simulate file drop
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file]
      }
    })

    // Check loading state
    expect(screen.getByRole("button", { name: /Upload a presentation first/i })).toBeDisabled()
    expect(screen.getByText(/Uploading/i)).toBeInTheDocument()

    // Wait for upload to complete
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "File uploaded successfully"
        })
      )
    })

    // Form should be enabled
    const titleInput = screen.getByLabelText("Project Title")
    const submitButton = screen.getByRole("button", { name: "Continue" })
    expect(titleInput).not.toBeDisabled()
    expect(submitButton).not.toBeDisabled()

    // Slides should be displayed
    expect(screen.getByText(/Slide 1/)).toBeInTheDocument()
  })

  it("handles file upload errors", async () => {
    renderComponent()
    
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    const dropzone = screen.getByTestId("dropzone")

    // Simulate invalid file drop
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file]
      }
    })

    // Check error state
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: "destructive",
        title: "Upload Error"
      })
    )

    // Form should remain disabled
    const titleInput = screen.getByLabelText("Project Title")
    expect(titleInput).toBeDisabled()
  })

  it("has correct heading structure", () => {
    renderComponent()
    
    const headings = screen.getAllByRole("heading", { level: 2 })
    expect(headings).toHaveLength(2)
    expect(headings[0].textContent).toBe("Video Metadata")
    expect(headings[1].textContent).toBe("Slides")
  })

  it("has correct layout structure", () => {
    const { container } = renderComponent()
    
    // Check for grid layout
    const gridContainer = container.querySelector(".grid")
    expect(gridContainer).toBeDefined()
    expect(gridContainer?.classList.contains("grid-cols-1")).toBe(true)
    expect(gridContainer?.classList.contains("lg:grid-cols-2")).toBe(true)
    
    // Check for two main columns
    const columns = container.querySelectorAll(".grid > div")
    expect(columns.length).toBe(2)
  })

  it("handles form submission with file", async () => {
    renderComponent()
    
    // Upload file first
    const file = createTestFile()
    fireEvent.drop(screen.getByTestId("dropzone"), {
      dataTransfer: {
        files: [file]
      }
    })

    // Wait for upload to complete
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "File uploaded successfully"
        })
      )
    })

    // Fill in the form
    fireEvent.change(screen.getByLabelText("Project Title"), {
      target: { value: "Test Video" }
    })
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" }
    })

    // Select a template
    fireEvent.click(screen.getByText("Business"))

    // Add a tag
    const tagInput = screen.getByPlaceholderText("Type a tag and press Enter")
    fireEvent.change(tagInput, { target: { value: "camera" } })
    fireEvent.keyDown(tagInput, { key: "Enter" })

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Continue" }))

    // Check success toast
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Project created successfully"
        })
      )
    })
  })

  it("prevents form submission without file", async () => {
    renderComponent()
    
    // Try to submit without file
    fireEvent.click(screen.getByRole("button", { name: /Upload a presentation first/i }))

    expect(mockToast).not.toHaveBeenCalled()
    expect(screen.getByRole("button", { name: /Upload a presentation first/i })).toBeDisabled()
  })
})