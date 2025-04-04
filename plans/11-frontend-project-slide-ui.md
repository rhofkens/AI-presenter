### In-Depth Description

**Functional Increment**  
- Develop UI pages for project listing and project detail view.  
- Display slides, their images, and the AI-generated narration.  
- Provide options to edit narration, re-generate text, or re-generate video.

**Objects / Components**  
- **ProjectList** Page:  
  - Fetches user's projects from the backend.  
  - Shows status, creation date, etc.  
- **ProjectDetail** Page:  
  - Lists slides (image + text).  
  - Editable narration field.  
  - Buttons for "Save" or "Re-generate."  
- **Video Player**:  
  - Displays the final video (if `VideoProject.local_video_path` is available).

**Testing Criteria**  
1. **(Light) Unit Tests**  
   - Minimal coverage for any custom hooks or critical logic.  
2. **E2E Tests**  
   - Log in, view the project list, and confirm all projects appear.  
   - Open a specific project, verify slides and narrations are displayed.  
   - Update a narration, re-generate AI text, confirm UI updates.  
   - If the video is ready, confirm it plays or can be displayed.

**Instruction: Next Step**  
- Upon completing Step 11, the next phase is **Step 12: Translation, Re-Generation, Cleanup**.

---