## In-Depth Description

### Functional Increment
- Implement a **“Create New”** page accessible from a “Create new” button (either in the sidebar or header).
- Divide the page into **three sections**:
  1. **Drop Zone**  
     - A UI area where the user can drag-and-drop PPT files (no actual backend upload yet).
  2. **Metadata Form**  
     - Basic text fields for project name/title, template selection dropdown, tags, etc.
     - Form inputs are strictly client-side placeholders at this stage.
  3. **Slides List**  
     - A placeholder list on the right column showing mock slides (e.g., “Slide 1, Slide 2”).
     - Each slide item might display a placeholder title, description, or narration text.

### Objects / Components
1. **CreateNewPage** Component  
   - Hosts the overall layout with a two-/three-column structure (depending on the design).
2. **DropZone** Sub-Component  
   - Provides a visual area for drag-and-drop, using a library (if desired) or a custom approach.  
   - Currently, it only accepts a file but does not post it to the server.
3. **MetadataForm** Sub-Component  
   - Displays input fields for project metadata.  
   - Use a controlled form approach with React hooks (e.g., `useState`, `useReducer`, or form libraries).
4. **SlidesList** Sub-Component  
   - Showcases placeholder slides.  
   - Each slide has static or mock data (e.g., “Slide 1: Intro text goes here”).

### Testing Criteria
1. **Playwright E2E**  
   - Click the “Create new” button → navigate to `/create` (or another designated route).  
   - Confirm the drop zone, metadata form, and slides list components appear.  
   - Attempt to drag-and-drop a PPT file → visually confirm the drop zone reacts (though no backend upload occurs).  
   - Enter data in the form fields (project title, etc.) and ensure no errors occur client-side.
2. **Visual Check**  
   - Layout matches the wireframe or mock design (columns for drop zone/form vs. slides list).  
   - No console errors or layout breaks.

## Instruction: Next Step
After completing Step 4 and verifying all acceptance criteria and tests, proceed to:

**Step 5: Integrate Authentication (Zitadel)**