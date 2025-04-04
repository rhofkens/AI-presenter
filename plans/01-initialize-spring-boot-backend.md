### In-Depth Description

**Functional Increment**  
- Create a minimal Spring Boot application with skeleton structure.  
- Include essential dependencies (Spring Web, Flyway, JPA).  
- Provide a health-check endpoint (`GET /health`) that returns a simple status message (e.g., `"OK"`).

**Objects / Components**  
- **Spring Boot Application Class**: `Application.java` (or similar) serves as the entry point.  
- **HealthController**: A simple REST controller that exposes `/health`.  
- **Flyway Configuration**: Minimal Flyway setup (though no migrations yet).  
- **pom.xml / build.gradle**: Must include the required dependencies for Spring Web, Flyway, JPA.  

**Testing Criteria**  
1. **Unit Tests**  
   - Must confirm `GET /health` returns HTTP 200 and the string `"OK"`.  
   - The application context loads without errors.  
2. **CI Pipeline**  
   - The build succeeds, and all tests pass.  

**Instruction: Next Step**  
- After successfully verifying Step 1, proceed to **Step 2: Basic Frontend Scaffolding & Integration**.

---

## Step 2

### File Name