# Design Plan: Step 2 - Basic Frontend Scaffolding & Integration

## 1. Design Decisions & Rationale

### 1.1 Frontend Technology Stack
- **Vite + React + TypeScript**: 
  - Using Vite for its superior build performance and modern development features
  - React with TypeScript for type safety and better developer experience
  - Follows architecture requirements and coding guidelines
  - To avoid compatibility issues we use react 18 (latest stable) and Vite 5 (latest stable).  Not react 19!!
 
### 1.2 UI Component Library & Styling
- **Tailwind CSS + shadcn/ui**:
  - Tailwind for utility-first CSS approach
  - shadcn/ui for pre-built, customizable components
  - Ensures consistent styling and reduces development time
  - To avoid compatibility issues we use tailwind 3 (latest stable), not tailwind 4!!


### 1.3 Project Structure
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── ui/        # shadcn/ui components
│   │   └── layout/    # Layout components
│   ├── styles/        # Global styles
│   ├── types/         # TypeScript type definitions
│   ├── lib/           # Utility functions
│   ├── App.tsx        # Root component
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── tailwind.config.js # Tailwind configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies and scripts
```

### 1.4 Integration with Spring Boot
- Frontend will be built and copied to `src/main/resources/static`
- Spring Boot configured to serve static content from root path
- All API requests will be prefixed with `/api`

## 2. Implementation Tasks Sequence

### 2.1 Frontend Project Setup
1. Initialize Vite project with React + TypeScript template
2. Configure ESLint and Prettier according to coding guidelines
3. Set up Git hooks for linting and formatting
4. Add Tailwind CSS and configure with project theme
5. Install and configure shadcn/ui

### 2.2 Basic Component Development
1. Create minimal homepage layout
2. Implement basic header with project title
3. Add placeholder content for future features
4. Style components using Tailwind CSS

### 2.3 Spring Boot Integration
1. Configure Spring Boot to serve static content
2. Configure frontend-maven-plugin for production builds
3. Configure proper routing for SPA (handle client-side routing)
4. Add basic error handling for 404 routes

### 2.4 Development Workflow Setup

#### Development Mode
1. Configure Vite development server with proxy to backend:
   ```javascript
   // vite.config.ts
   export default defineConfig({
     server: {
       proxy: {
         '/api': 'http://localhost:8080'
       }
     }
   })
   ```
2. Add development scripts to package.json:
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "tsc && vite build",
       "preview": "vite preview"
     }
   }
   ```

#### Production Build
1. Configure frontend-maven-plugin in pom.xml:
   ```xml
   <plugin>
     <groupId>com.github.eirslett</groupId>
     <artifactId>frontend-maven-plugin</artifactId>
     <version>${frontend-maven-plugin.version}</version>
     <configuration>
       <workingDirectory>frontend</workingDirectory>
     </configuration>
     <executions>
       <execution>
         <id>install node and npm</id>
         <goals>
           <goal>install-node-and-npm</goal>
         </goals>
       </execution>
       <execution>
         <id>npm install</id>
         <goals>
           <goal>npm</goal>
         </goals>
       </execution>
       <execution>
         <id>npm run build</id>
         <goals>
           <goal>npm</goal>
         </goals>
         <configuration>
           <arguments>run build</arguments>
         </configuration>
       </execution>
     </executions>
   </plugin>
   ```
2. Configure build output to `src/main/resources/static`
3. Add resource handling in Spring Boot for SPA routing

## 3. Logging Strategy

### 3.1 Frontend Logging
- Configure console logging for development
- Implement error boundary for React components
- Set up toast notifications for user feedback

### 3.2 Backend Logging
- Log all static resource requests at DEBUG level
- Log 404 errors at WARN level
- Include request path and user agent in logs

## 4. Testing Strategy

### 4.1 Frontend Tests
- Set up Playwright for E2E testing
- Create smoke test for homepage
- Verify static content serving
- Test client-side routing

### 4.2 Backend Integration Tests
1. Health Endpoint Integration:
   ```typescript
   // tests/health.spec.ts
   test('health endpoint integration', async ({ page }) => {
     await page.goto('/');
     const response = await page.request.get('/api/health');
     expect(response.ok()).toBeTruthy();
     const health = await response.json();
     expect(health.status).toBe('UP');
   });
   ```

2. Page Reload Testing:
   ```typescript
   // tests/routing.spec.ts
   test('page reload handling', async ({ page }) => {
     // Test direct navigation
     await page.goto('/');
     expect(await page.textContent('h1')).toBe('PPT-to-Video Converter');
     
     // Test page reload
     await page.reload();
     expect(await page.textContent('h1')).toBe('PPT-to-Video Converter');
     
     // Test deep link reload
     await page.goto('/some/deep/route');
     expect(await page.textContent('h1')).toBe('PPT-to-Video Converter');
   });
   ```

## 5. Development Workflow Documentation

### 5.1 Development Mode
```bash
# Terminal 1: Start Spring Boot backend
./mvnw spring-boot:run

# Terminal 2: Start Vite dev server
cd frontend
npm run dev
```
- Frontend available at http://localhost:5173
- Hot reload enabled for frontend changes
- API requests proxied to backend at http://localhost:8080

### 5.2 Production Build
```bash
# Build both frontend and backend
./mvnw clean package

# Run the application
java -jar target/ai-presenter-0.0.1-SNAPSHOT.jar
```
- Single JAR contains both frontend and backend
- Frontend served from root path (/)
- All API endpoints under /api

## 6. Acceptance Criteria

- [ ] Frontend successfully builds with Vite
- [ ] Homepage displays with proper styling
- [ ] Static content served correctly from Spring Boot
- [ ] All E2E tests passing, including:
  - [ ] Health endpoint integration
  - [ ] Page reload handling
  - [ ] Client-side routing
- [ ] ESLint/Prettier properly enforcing code style
- [ ] Development workflow (hot reload, proxy) working
- [ ] Production build process verified with frontend-maven-plugin
- [ ] Logging configured and working

## 7. Risks and Mitigations

### 7.1 Risks
1. **Static Content Serving**: Spring Boot might not correctly serve SPA routes
2. **Build Integration**: frontend-maven-plugin configuration might cause issues
3. **Performance**: Large bundle size could impact initial load time
4. **Development Experience**: Switching between dev/prod modes might be confusing

### 7.2 Mitigations
1. Implement proper configuration for serving index.html on all routes
2. Provide detailed documentation for both development and production workflows
3. Configure Vite build optimization and code splitting
4. Create npm scripts for common development tasks

## 8. Next Steps

After successful implementation and validation:
1. Commit all changes to git
2. Document development and build processes in README
3. Proceed to Step 3: Home Page UI implementation
```bash
# Build both frontend and backend
./mvnw clean package

# Run the application
java -jar target/ai-presenter-0.0.1-SNAPSHOT.jar
```
- Single JAR contains both frontend and backend
- Frontend served from root path (/)
- All API endpoints under /api

## 6. Acceptance Criteria

- [ ] Frontend successfully builds with Vite
- [ ] Homepage displays with proper styling
- [ ] Static content served correctly from Spring Boot
- [ ] All E2E tests passing, including:
  - [ ] Health endpoint integration
  - [ ] Page reload handling
  - [ ] Client-side routing
- [ ] ESLint/Prettier properly enforcing code style
- [ ] Development workflow (hot reload, proxy) working
- [ ] Production build process verified with frontend-maven-plugin
- [ ] Logging configured and working

## 7. Risks and Mitigations

### 7.1 Risks
1. **Static Content Serving**: Spring Boot might not correctly serve SPA routes
2. **Build Integration**: frontend-maven-plugin configuration might cause issues
3. **Performance**: Large bundle size could impact initial load time
4. **Development Experience**: Switching between dev/prod modes might be confusing

### 7.2 Mitigations
1. Implement proper configuration for serving index.html on all routes
2. Provide detailed documentation for both development and production workflows
3. Configure Vite build optimization and code splitting
4. Create npm scripts for common development tasks

## 8. Next Steps

After successful implementation and validation:
1. Commit all changes to git
2. Document development and build processes in README
3. Proceed to Step 3: Home Page UI implementation