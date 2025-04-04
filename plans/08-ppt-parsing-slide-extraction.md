### In-Depth Description

**Functional Increment**  
- Parse the uploaded PPT into individual slides.  
- Convert each slide to an image (PNG/JPG).  
- Extract text from slides (store in Markdown format).  
- Create a `Slide` entity linked to `VideoProject`.

**Objects / Components**  
- **Parsing Service**: A utility or service to read the PPT file.  
- **Slide Entity**:  
  - `slide_id`  
  - `project_id` (FK to `VideoProject`)  
  - `slide_index`  
  - `text_narration` (initially the extracted text)  
  - `local_image_path` (path to the slide image)  
- **Endpoint**: `POST /api/projects/{id}/parse` triggers the parsing process.

**Testing Criteria**  
1. **Unit Tests**  
   - Mock PPT files with known content → verify that the correct number of slides, text, and images are produced.  
   - Handle errors gracefully (e.g., corrupted files).  
2. **E2E Tests**  
   - Upload a sample PPT, call `/parse`, then verify the system displays slides with text and images in the UI.  
   - Confirm the database has the correct records for each slide.

**Instruction: Next Step**  
- After Step 8, proceed to **Step 9: AI LLM Integration (Text Generation)**.

---