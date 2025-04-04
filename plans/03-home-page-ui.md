## In-Depth Description

### Functional Increment
- Implement the **Home** page layout based on the provided UI design.  
- Display **placeholder data** for project or video items (e.g., title, tags, owner, etc.), without making any real API calls to the backend.
- Ensure that sidebar navigation, top header, icons, and overall styling (Tailwind + shadcn/ui) match the design mockup or wireframes.

### Objects / Components
1. **HomePage** React Component  
   - Renders the main content area, including a list or grid of placeholder items.  
   - Can show multiple project cards with static (hardcoded) data (e.g., “Project A”, “Project B”).
2. **Sidebar & Header**  
   - A sidebar that includes navigation items (e.g., “Home”, “Create new”, “Projects”), though only “Home” is active at this stage.  
   - A top header or navbar if required by design (profile menu, app title, etc.).
3. **Placeholder Data**  
   - A simple array of objects representing projects/videos.  
   - Each object might include fields like `title`, `description`, `tags`, etc.

### Testing Criteria
1. **Smoke Test (Playwright)**  
   - Navigate to the home page route (e.g., `/home` or `/`) and verify that the placeholder list is displayed.  
   - Confirm that the UI loads with no JS console errors and the layout is correct.  
2. **Visual Check**  
   - Ensure the sidebar and top header (if present) follow the design, with correct icons and spacing.  
   - Confirm placeholder data is rendered in the specified format (cards, rows, or grids).

## Instruction: Next Step
After completing Step 3 and verifying all acceptance criteria (including tests), proceed to:

**Step 4: Create New View (Drop Zone, Form, Slides List)**