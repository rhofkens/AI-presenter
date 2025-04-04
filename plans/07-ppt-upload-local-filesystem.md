### In-Depth Description

**Functional Increment**  
- Implement file upload for PPT files (limit: 50 MB).  
- Store files in a local folder.  
- Add server-side validation to reject invalid file types or oversized files.

**Objects / Components**  
- **Upload Endpoint**: `POST /api/projects/{id}/upload`  
- **Local Storage Path**: A configuration property indicating where to store PPT files.  
- **Validation**:  
  - File size check (<= 50 MB)  
  - Extension check (`ppt` or `pptx`)  
- **Linking**: Update the `VideoProject` entity to store the path to the uploaded file.

**Testing Criteria**  
1. **Unit Tests**  
   - Mock file uploads to ensure correct behavior for valid vs. invalid inputs.  
   - Verify file system handling logic (path generation, error handling).  
2. **E2E Tests**  
   - Attempt to upload a valid PPT → must succeed.  
   - Attempt to upload an invalid type or too-large file → must reject with an appropriate message.

**Instruction: Next Step**  
- After Step 7 passes all tests, proceed to **Step 8: PPT Parsing & Slide Extraction**.

---