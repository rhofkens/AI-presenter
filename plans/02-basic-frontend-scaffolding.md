### In-Depth Description

**Functional Increment**  
- Initialize a React + TypeScript frontend using Vite.  
- Add Tailwind CSS and shadcn/ui.  
- Create a minimal homepage (e.g., “PPT-to-Video Converter”) that is bundled into the Spring Boot JAR.  
- Configure Spring Boot to serve the compiled frontend at the root path (`/`).

**Objects / Components**  
- **React Application**: Basic structure under a `frontend` or similar folder.  
- **Vite Configuration**: For building the TypeScript React code.  
- **Tailwind & shadcn/ui**: Ensure Tailwind is configured (e.g., `tailwind.config.js`) and shadcn/ui is installed.  
- **Spring Boot Resource Handling**: The `src/main/resources/static` or `frontend/dist` path where the built assets are placed, and how it’s packaged into the final JAR.

**Testing Criteria**  
1. **Build Verification**  
   - The single JAR, when run, should serve the static React app.  
   - No errors when building or running the combined application.  
2. **E2E Smoke Test (Playwright)**  
   - Navigate to the root URL.  
   - Verify the homepage displays a title (e.g., “PPT-to-Video Converter”).

**Instruction: Next Step**  
- After successful completion of Step 2, proceed to **Step 3: Integrate Authentication (Zitadel)**.

---

## Step 3

### File Name