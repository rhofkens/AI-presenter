# Architecture Document

## Table of Contents
1. [Technology Stack](#technology-stack)  
2. [External Services Integration](#external-services-integration)  
3. [High-Level UI Design & Component Breakdown](#high-level-ui-design--component-breakdown)  
4. [In-Depth Database Model](#in-depth-database-model)  
5. [Security Design](#security-design)  
6. [Additional Architecture Topics](#additional-architecture-topics)  

---

## Technology Stack

### 1. Frontend
- **Framework**: React (with Vite)
- **Styling**: Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/) for component abstractions
- **Language**: TypeScript (not JavaScript)
- **Build & Deployment**: 
  - Compiled and bundled into a static set of files by Vite.
  - Packaged into the Spring Boot JAR for a monolithic deployment.

### 2. Backend
- **Framework**: Java Spring Boot (Monolithic)
- **Language**: Java 17+ (recommended)
- **ORM / Persistence**: **JPA** (Hibernate under the hood)
- **Deployment**: 
  - Packaged as a single JAR that includes both backend and frontend assets.
  - Deployed on [Railway](https://railway.app/) (PaaS environment).

### 3. Database
- **DB Engine**: PostgreSQL
- **Schema Migrations**: Flyway  
  - Manages incremental schema updates.
  - Ensures consistent schema across environments.

### 4. Local File System (for large assets)
- **File Storage**: Local file system for generated videos and uploaded PPT files (up to 50 MB).
- **Future Scope**: Potential migration to cloud-based object storage (e.g., S3) in a future phase, but out of current scope.

### 5. Authentication
- **Identity Provider**: [Zitadel](https://zitadel.com/)
- **Authorization & Roles**:  
  - Single admin role for now.
  - Users authenticate via Zitadel and obtain tokens (JWT).
  - Session timeout is 30 minutes.

---

## External Services Integration

### 1. AI Language Model (OpenAI via Spring AI)
- **Library**: Spring AI framework, version `1.1.0-SNAPSHOT`.
- **Functionality**:  
  - ChatCompletion for generating narratives, transitional text, and translations.
  - Fluent `ChatClient` API handles requests/responses to OpenAI.
- **Expected Usage**:  
  - Approximately 1000 PPT uploads/day, no major rate-limit concerns for now.

### 2. Text-to-Speech & Video Generation (Synthesia)
- **Workflow**:  
  1. Each slide’s final narration (generated or edited by user) is sent to Synthesia.
  2. Synthesia creates narrated video segments and merges them.
  3. A **webhook callback** from Synthesia notifies the backend when video generation completes.
- **Partial Results**:  
  - Currently, no partial results retrieval.
  - The application waits for the webhook to confirm completion.

### 3. Translation Service (OpenAI)
- **Deep Copy of Project**:  
  - When translating, the system creates a new “Project” record (and new “Slide” records), each containing the translated text.
  - Ensures the original project remains intact while the translated version is a separate entity.
- **Storage**:  
  - All translated slides and narrations are stored in PostgreSQL (TEXT columns).

---

## High-Level UI Design & Component Breakdown

### 1. Overall UI Structure
- **Single-Page Application** with multiple sections/views:
  1. **Login Flow**  
     - Redirects to Zitadel if not authenticated.
  2. **Project List**  
     - Displays the user’s existing video projects.
     - Has a button to upload a new PPT (opens the “New Project” flow).
  3. **New Project Flow**  
     - **Drag-and-Drop Zone** for PPT file upload.
     - Shows real-time file validation/status.  
  4. **Project Detail View**  
     - Displays slides in a list (or card) format.
     - Each slide shows:
       - Slide image.
       - Generated or user-edited text/narration.
     - Controls to edit the narration, re-generate the AI text, or re-generate the video.
     - **Video Player** to preview the final rendered video.
  5. **Translation Flow**  
     - Option to create a translated copy of the current project.

### 2. UI Components
1. **FileUploader**  
   - Handles drag-and-drop upload & file validation (PPT only, max 50 MB).
2. **ProjectList**  
   - Fetches and displays the user’s projects with status (e.g., “In Progress”, “Ready”).
3. **ProjectEditor**  
   - Main form for editing title, description, and selecting a template.
   - Lists slides for narration editing.
4. **SlideCard**  
   - Shows slide image (PNG/JPG).
   - Text area for narration content.
   - “Save” or “Re-generate” buttons.
5. **VideoPlayer**  
   - Standard HTML5 player with React/TypeScript wrappers.
6. **Toast/Modal Components**  
   - For feedback during video generation, errors, confirmations, etc.

---

## In-Depth Database Model

Below is an expanded Entity Relationship Diagram (ERD) outline incorporating **user context** and **video file path**.  

┌────────────────────────────────────┐
│            VideoProject           │
│———————————–│
│ project_id (PK, UUID)            │
│ user_id (VARCHAR or UUID)        │
│ title (VARCHAR)                  │
│ description (TEXT)               │
│ status (VARCHAR)                 │
│ template_selected (VARCHAR)      │
│ local_video_path (VARCHAR)       │ ← Path to final generated video
│ creation_timestamp (TIMESTAMP)   │
└────────────────────────────────────┘
│
│ 1..n
▼
┌────────────────────────────────────┐
│               Slide               │
│———————————–│
│ slide_id (PK, UUID)              │
│ project_id (FK → VideoProject)    │
│ slide_index (INT)                │
│ text_narration (TEXT)            │
│ local_image_path (VARCHAR)       │
│ creation_timestamp (TIMESTAMP)   │
└────────────────────────────────────┘

### Table Details

1. **`VideoProject`**  
   - `project_id (UUID, PK)`: Unique identifier for each project.  
   - `user_id (VARCHAR or UUID)`: Links to the ID from Zitadel or a user management table (stores who owns/created the project).  
   - `title (VARCHAR)`: Project title, either AI-generated or edited by the user.  
   - `description (TEXT)`: Main project description.  
   - `status (VARCHAR)`: Tracks the state (e.g., `NEW`, `IN_PROGRESS`, `READY`, `ERROR`).  
   - `template_selected (VARCHAR)`: Which template the user selected.  
   - `local_video_path (VARCHAR)`: File system path to the **final generated video** (if any).  
   - `creation_timestamp (TIMESTAMP)`: When the project was created.

2. **`Slide`**  
   - `slide_id (UUID, PK)`: Unique identifier for each slide.  
   - `project_id (UUID, FK)`: References the `VideoProject` to which the slide belongs.  
   - `slide_index (INT)`: The ordering of the slides.  
   - `text_narration (TEXT)`: Narrative text (AI-generated or user-edited).  
   - `local_image_path (VARCHAR)`: File system path for the converted slide image.  
   - `creation_timestamp (TIMESTAMP)`: When the slide was added to the project.

### Notes
- **Translations**: A translated project is inserted as a **new `VideoProject`** record, complete with its own set of `Slide` entries.
- **No Versioning**: Only the latest version of each slide’s narration is stored.
- **Future Indexes**: If queries get large, we may add indexes on `user_id`, `status`, or `creation_timestamp`.

---

## Security Design

1. **Authentication**
   - **Zitadel** as the IDP.  
   - Users authenticate with Zitadel’s hosted login; upon success, a JWT is issued.  
   - **Monolithic App** verifies JWT on each request.

2. **Authorization**
   - Currently a single “admin” role.  
   - Fine-grained permissions not implemented—admin can do all actions.
   - Each `VideoProject` has a `user_id` which must match the authenticated user’s ID (should we decide to restrict cross-user access in the future).

3. **Data Encryption**
   - **In Transit**: All traffic over HTTPS (Railway provides SSL/TLS).  
   - **At Rest**: Database encryption depends on hosting provider’s configuration (e.g., Railway’s managed Postgres).  
   - **File System**: No special encryption is configured for local PPT/video files in this phase.

4. **Secrets Management**
   - API Keys (OpenAI, Synthesia) stored in environment variables outside the codebase.  
   - No key rotation process needed now.

5. **Access Controls**
   - Basic check that each project’s `user_id` corresponds to the user performing the action (if multi-user mode is truly enabled later).  
   - Currently, only one role exists, so the entire system is effectively “admin mode.”

6. **Other Security Measures**
   - **CSRF**: Since this is a single-page app communicating with a token-based backend, CSRF risk is minimal.  
   - **Rate Limiting**: Not implemented at this time but can be introduced if usage scales.

---

## Additional Architecture Topics

1. **Performance & Load Handling**
   - **Expected Load**: ~1000 PPT uploads/day, ~5 concurrent users.  
   - **Video Generation**: Offloaded to Synthesia. The system only stores and retrieves results.  
   - **Threading**: Spring Boot + JPA can handle concurrency for up to 5–10 simultaneous uploads comfortably.

2. **Logging & Monitoring**
   - **Logback** with OpenTelemetry extension.  
   - **Dash0** for additional metrics/monitoring integration.  
   - Potential to integrate with external log or metric dashboards for deeper insight.

3. **Deployment Architecture (Railway)**
   - Single container/process running the Spring Boot JAR.  
   - Local file system within the container for PPT and generated videos.  
   - Must ensure ephemeral storage on Railway is sufficient for 50 MB uploads and final videos.

4. **Future Expansion**
   - **Object Storage**: Potential move to S3 or equivalent for persistent large-file storage.  
   - **Multi-Tenancy & Roles**: If more roles or multi-tenant support is needed.  
   - **Advanced Editing**: Could incorporate timeline-based editing or advanced templates.
   - **Audit Trails**: Could be introduced if compliance or detailed history tracking is required.

---

## Conclusion

This Architecture Document outlines how the **PowerPoint-to-Video Converter** system will be structured:

- **Monolithic Spring Boot** application (Java + React in one JAR), deployed on Railway.  
- **PostgreSQL** for structured metadata & text, **Local File System** for storing PPT and generated videos.  
- **OpenAI** + **Synthesia** integration for generating slide narratives and final video content.  
- **Zitadel** for authentication (JWT-based sessions), single admin role.  
- **JPA** (Hibernate) as the persistence layer to interact with the database.

By centralizing all functionality into a single deployment artifact, we simplify the initial launch and operations on Railway. Future scalability improvements (object storage, microservices, advanced security features) can be introduced as usage grows and requirements evolve.

**_End of Document_**