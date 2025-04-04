### In-Depth Description

**Functional Increment**  
- Introduce a `VideoProject` entity/table.  
- Add CRUD operations: create, read (list/get by ID), update, and delete.  
- Link projects to a `user_id` so each user can manage their own.

**Objects / Components**  
- **`VideoProject` Entity**: Fields for `project_id`, `user_id`, `title`, `description`, `status`, `creation_timestamp`.  
- **`VideoProjectRepository`** (Spring Data JPA)  
- **`VideoProjectController`**:  
  - `POST /api/projects`  
  - `GET /api/projects` (list user's projects)  
  - `GET /api/projects/{id}`  
  - `PUT /api/projects/{id}` (update metadata)  
  - `DELETE /api/projects/{id}` (delete or mark as deleted)

**Testing Criteria**  
1. **Unit Tests**  
   - **Repository Tests**: Confirm CRUD operations.  
   - **Controller Tests**: Ensure correct status codes (e.g., 201 on create, 200 on updates, 404 on non-existent project).  
2. **E2E Tests**  
   - Create a project, then list all projects → must see the newly created project.  
   - Update project metadata → verify changes persist.  
   - Delete → project must be removed from subsequent listings.

**Instruction: Next Step**  
- Upon completing Step 6, move to **Step 7: PPT Upload & Local File Storage**.

---