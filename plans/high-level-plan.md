# Revised High-Level Implementation Plan (With Objectives, Acceptance Criteria, and Testing)

This updated plan includes **12 steps** for implementing the **PowerPoint-to-Video Converter** application. Two new **frontend UI** steps (Step 3 and Step 4) have been inserted after the original Step 2. Each step details:

1. **Objectives** – A brief summary of what we aim to achieve.  
2. **Acceptance Criteria** – A checklist of minimal conditions that MUST be met for the step to be considered complete.  
3. **Testing** – A high-level outline of the tests (unit, integration, or E2E) to verify functionality and quality.  
4. **Next Step** – The subsequent step to undertake once acceptance criteria are fulfilled.

---

## Step 1: Initialize Spring Boot Backend

### Objectives
- Create a **minimal Spring Boot** application with essential dependencies (Spring Web, Flyway, JPA).
- Provide a basic `/health` endpoint that returns a simple “OK” or similar status.

### Acceptance Criteria
1. **Project Structure**: A valid Maven/Gradle project with the required dependencies.
2. **Health Endpoint**: `/health` returns HTTP 200 and a short status message.
3. **Flyway Setup**: Flyway is configured (no migrations yet, but must not error on startup).

### Testing
- **Unit Tests**:  
  - A test verifying `/health` returns 200 with an expected response body.  
  - Application context loads successfully with all beans.
- **CI Pipeline**:  
  - All tests pass, and the build succeeds without errors.

### Next Step
- **Step 2**: Basic Frontend Scaffolding & Integration

---

## Step 2: Basic Frontend Scaffolding & Integration

### Objectives
- Initialize a **React + TypeScript** frontend using Vite.
- Include **Tailwind CSS** and **shadcn/ui**.
- Bundle the frontend assets into the Spring Boot JAR so the application serves them at the root (`/`).

### Acceptance Criteria
1. **Frontend Build**: Running a single Maven/Gradle command produces a combined JAR.
2. **Homepage**: Accessing `http://localhost:8080/` displays a basic React page (e.g., “PPT-to-Video Converter”).
3. **No Errors**: Application logs show no errors during startup or page load.

### Testing
- **Smoke Test (Playwright)**:  
  - Access the root URL, confirm the static homepage loads.  
  - No JavaScript console errors in the browser (verified in headless mode).
- **CI Pipeline**:  
  - Frontend build completes successfully, integrated with the backend JAR.

### Next Step
- **Step 3**: Home Page UI (Placeholder Data)

---

## Step 3: Home Page UI (Placeholder Data)

### Objectives
- Implement the **Home** page layout based on the provided design (e.g., sidebar, top navbar, main content area).
- Display **placeholder data** for video or project listings; **no** real backend data loading yet.
- Ensure that styling (Tailwind + shadcn/ui) matches the provided mockup, including any icons and layout details.

### Acceptance Criteria
1. **UI Layout**: Sidebar and top navbar are present and visually consistent with the design.
2. **Placeholder List**: A list or grid of “projects” (or “videos”) displayed with static data (title, tags, etc.).
3. **Navigation Items**: “Home” is active; other nav items exist but are non-functional.

### Testing
- **Playwright E2E**:  
  - Navigate to `/home` (or root, if the design places it there).  
  - Verify all placeholder items are displayed with correct text and icons.
- **Visual Check**:  
  - Confirm the layout is responsive (if required by design).  
  - No major UI layout errors or missing icons.

### Next Step
- **Step 4**: Create New View (Drop Zone, Form, Slides List)

---

## Step 4: Create New View (Drop Zone, Form, Slides List)

### Objectives
- Add a “Create New” page or route accessible from a button (“Create new”).
- **Three sections** on the page:
  1. **Drop Zone**: UI for PPT upload (no actual upload logic yet).
  2. **Metadata Form**: Basic text fields for title, template selection dropdown, tags, etc.
  3. **Slides List** (placeholder data for each slide: index, text, etc.).

### Acceptance Criteria
1. **Create New Button**: Navigates to the new page (e.g., `/create`).
2. **Drop Zone**: Visually indicates drag-and-drop; currently does nothing with real files.
3. **Metadata Form**: Includes title, template selection, tags, or other relevant fields (non-functional yet).
4. **Slides List**: Shows placeholder slides on the right column with minimal details.

### Testing
- **Playwright E2E**:  
  - Click “Create new” → arrives at `/create`.  
  - Check that the drop zone, form fields, and placeholder slides are rendered.  
  - Verify basic user inputs can be typed (client-side only).
- **Visual Check**:  
  - Ensure layout matches the design concept, columns are properly displayed.

### Next Step
- **Step 5**: Integrate Authentication (Zitadel)

---

## Step 5: Integrate Authentication (Zitadel)

### Objectives
- Configure **Spring Security** to validate JWT tokens from Zitadel.
- Enforce an “admin” role (if necessary) to restrict access to certain endpoints.
- Only allow authenticated users to access project resources.

### Acceptance Criteria
1. **JWT Validation**: A valid token from Zitadel must grant access to protected endpoints; invalid or expired tokens must be rejected.
2. **Session Timeout**: Enforce a 30-minute session inactivity timeout (if relevant for token or refresh flow).
3. **Unauthenticated**: The `/health` or any designated public endpoint remains open; all others require authentication.

### Testing
- **Unit Tests**:  
  - Spring Security config tests ensuring correct authentication flow.  
  - Verify unauthorized requests return 401 or 403 status.
- **E2E Tests**:  
  - Attempt to access a protected route without a valid token → expect failure.  
  - Provide a valid admin token → route is accessible.

### Next Step
- **Step 6**: Basic Project Entity & CRUD

---

## Step 6: Basic Project Entity & CRUD

### Objectives
- Create a `VideoProject` entity and repository with fields like `title`, `description`, `user_id`, etc.
- Provide endpoints for **create**, **list**, **get by ID**, **update**, **delete**.
- Link each project to the authenticated user (by `user_id`).

### Acceptance Criteria
1. **Database**: Flyway migration sets up a `VideoProject` table with required columns.
2. **CRUD Endpoints**:  
   - `POST /api/projects` creates a new project.  
   - `GET /api/projects` lists all user’s projects.  
   - `GET /api/projects/{id}` retrieves a specific project.  
   - `PUT /api/projects/{id}` updates metadata.  
   - `DELETE /api/projects/{id}` deletes or marks it deleted.
3. **Security**: Only an authenticated user can manage their own projects.

### Testing
- **Unit Tests**:  
  - Repository tests confirming CRUD.  
  - Controller tests verifying request/response correctness (status codes, JSON format).
- **E2E Tests**:  
  - Create a project → it appears in the list.  
  - Update a project’s title → changes are reflected.  
  - Delete a project → it no longer appears in subsequent listings.

### Next Step
- **Step 7**: PPT Upload & Local File Storage

---

## Step 7: PPT Upload & Local File Storage

### Objectives
- Implement file upload for PPT files (max 50 MB).
- Store them on the local file system; keep the path in the `VideoProject`.
- Validate file type and size.

### Acceptance Criteria
1. **Upload Endpoint**: `POST /api/projects/{id}/upload` allows file upload for an existing project.
2. **File Validation**: Reject if file size > 50 MB or extension isn’t `.ppt` / `.pptx`.
3. **Persistence**: The system records the file path (e.g., `project-uploads/<projectId>.pptx`) in the database.

### Testing
- **Unit Tests**:  
  - Mock file uploads, confirm size and extension checks.  
  - Handle errors gracefully (e.g., 400 or 413 if file too large).
- **E2E Tests**:  
  - Upload a valid PPT, ensure success and a stored path.  
  - Try an invalid file → must see an error response.

### Next Step
- **Step 8**: PPT Parsing & Slide Extraction

---

## Step 8: PPT Parsing & Slide Extraction

### Objectives
- Parse the uploaded PPT file, extract slides, convert each slide to an image, and store text in Markdown format.
- Create a `Slide` entity linked to `VideoProject`.

### Acceptance Criteria
1. **Slide Entity**: Database table with fields for slide ID, project ID, index, text, image path.
2. **Parsing Service**:  
   - Reads the PPT from local storage.  
   - Extracts text.  
   - Generates an image (PNG/JPG) for each slide.  
   - Creates `Slide` records.
3. **Endpoint**: `POST /api/projects/{id}/parse` triggers the parsing process.

### Testing
- **Unit Tests**:  
  - Mock PPT parsing logic with a known file, verify correct text and image count.  
  - Error handling for corrupted files or read issues.
- **E2E Tests**:  
  - Upload a sample PPT, parse it, and confirm that slides appear in the database.  
  - UI (if integrated) shows a list of newly created slides.

### Next Step
- **Step 9**: AI LLM Integration (Text Generation)

---

## Step 9: AI LLM Integration (Text Generation)

### Objectives
- Use OpenAI (via Spring AI) to generate narrations for each slide based on extracted text.
- Insert transitional phrases (“Now let’s talk about…”) automatically.

### Acceptance Criteria
1. **LLM Service**: A Spring Bean that calls OpenAI’s ChatCompletion endpoint for each slide’s text.
2. **Narration Field**: The resulting text is saved back to `Slide.text_narration`.
3. **Error Handling**: If the AI service is unavailable or returns an error, handle gracefully (retry or fail with a clear message).

### Testing
- **Unit Tests**:  
  - Mock OpenAI responses, confirm final text is appended or updated in each slide.  
  - Validate transitions are inserted properly.
- **E2E Tests**:  
  - Trigger “Generate Narration” on a parsed project.  
  - Verify each slide’s `text_narration` is updated.

### Next Step
- **Step 10**: TTS & Video Generation (Synthesia Integration)

---

## Step 10: TTS & Video Generation (Synthesia Integration)

### Objectives
- Integrate with Synthesia to convert slide narrations into a continuous video.
- Handle Synthesia’s webhook callback to mark the video as complete or errored.
- Store the final video path in `VideoProject.local_video_path`.

### Acceptance Criteria
1. **Endpoint**: `POST /api/projects/{id}/generate-video` initiates Synthesia TTS generation.
2. **Webhook**: A new endpoint (e.g., `POST /api/synthesia/callback`) receives status updates.  
3. **Local Video Path**: Final .mp4 (or similar) file is stored locally, path updated in the project record.

### Testing
- **Unit Tests**:  
  - Mock Synthesia API calls, confirm the correct data is sent.  
  - Confirm the project status and `local_video_path` update on webhook success.
- **E2E Tests**:  
  - Trigger video generation, simulate a success callback → the project moves to “READY.”  
  - The UI displays a link or preview for the final video.

### Next Step
- **Step 11**: Frontend Project & Slide Management UI

---

## Step 11: Frontend Project & Slide Management UI

### Objectives
- Create a more advanced UI to list projects, show slides, edit narrations, and watch the generated video.
- Provide user options (re-generate slides, re-generate video, etc.) in the UI.

### Acceptance Criteria
1. **Project List**: Displays each project’s title, status, creation date, etc.
2. **Project Detail**: Shows slides (with images + narration text).  
   - Allows editing text fields.  
   - Option to “Save” or “Re-Generate Narration.”
3. **Video Player**: If a final video exists, the user can play it.

### Testing
- **(Light) Unit Tests**:  
  - Possibly for React utility functions or Redux/Context.  
- **E2E Tests**:  
  - Create a new project, parse slides, generate narration, and verify the UI displays updated narrations.  
  - Generate video and confirm the video player is present with a valid path.

### Next Step
- **Step 12**: Translation, Re-Generation, and Cleanup

---

## Step 12: Translation, Re-Generation, and Cleanup

### Objectives
- Implement a **translation** feature (using OpenAI) to produce a new `VideoProject` with translated slides.
- Allow user to re-generate the final video after changes.
- Support **delete** operations to remove a project and associated data.

### Acceptance Criteria
1. **Translation Endpoint**: `POST /api/projects/{id}/translate?lang=XX` creates a new project with translated slides.
2. **Re-Generate**: User can re-trigger AI narration or TTS if slides/narrations are updated.
3. **Delete**: A “Delete Project” feature removes or flags the project in the database and deletes local files if necessary.

### Testing
- **Unit Tests**:  
  - Mock translation calls, ensure a new project is created with slides in the new language.  
  - Validate re-generate and delete flows.
- **E2E Tests**:  
  - Translate an existing project → verify a new ID with translated slides.  
  - Update text, re-generate video → confirm a new video version is produced.  
  - Delete a project → it no longer appears in the list or via the API.

### Next Step
- **Completion**: At this point, the core functionality is delivered. Further improvements or features can be scheduled in future iterations.

---

**End of Document**  