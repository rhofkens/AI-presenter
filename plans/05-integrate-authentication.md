### In-Depth Description

**Functional Increment**  
- Configure Spring Security to verify JWT tokens from Zitadel.  
- Implement a single "admin" role mechanism (even if it's a placeholder).  
- Secure endpoints so that unauthenticated users cannot access project-related APIs (except `/health`).  
- Enforce a 30-minute session timeout.

**Objects / Components**  
- **SecurityConfig**: Spring Boot config class handling authentication (JWT decoding, role checks).  
- **Zitadel Integration**: Key environment variables (issuer URL, client IDs, etc.) for verifying tokens.  
- **Backend Controllers**: Adjust existing endpoints (future ones, too) to require authentication except the `/health` endpoint.

**Testing Criteria**  
1. **Unit Tests**  
   - Validate that requests with valid tokens can access secured endpoints.  
   - Validate that requests with invalid/expired tokens are rejected (HTTP 401 or 403).  
2. **E2E Tests**  
   - Attempt accessing a protected route without a token → must be denied or redirected.  
   - Use a test user token from Zitadel → must be granted access.

**Instruction: Next Step**  
- After Step 5 is verified, proceed to **Step 6: Basic Project Entity & CRUD**.

---