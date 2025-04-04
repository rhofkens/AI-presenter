# Detailed Coding Guidelines Document

This document establishes mandatory coding standards for the project. All developers MUST adhere to these guidelines when writing code for both the backend (Spring Boot/Java) and the frontend (React/TypeScript). Deviations from these guidelines require explicit approval from the technical lead.

---

## Table of Contents
1. [Backend Coding Guidelines](#backend-coding-guidelines)
   - [1.1 Code Style & Formatting](#11-code-style--formatting)
   - [1.2 Exception Handling & Logging](#12-exception-handling--logging)
   - [1.3 Architectural Layers & Design Patterns](#13-architectural-layers--design-patterns)
   - [1.4 Configuration & Security](#14-configuration--security)
2. [Frontend Coding Guidelines](#frontend-coding-guidelines)
   - [2.1 Code Style & Formatting](#21-code-style--formatting)
   - [2.2 Project Structure & Component Organization](#22-project-structure--component-organization)
   - [2.3 State Management & API Integration](#23-state-management--api-integration)
   - [2.4 Error Handling & User Feedback](#24-error-handling--user-feedback)
   - [2.5 Tooling, Linting & Formatting](#25-tooling-linting--formatting)

---

## 1. Backend Coding Guidelines

### 1.1 Code Style & Formatting
- **Adhere Strictly to Google Java Style**:  
  - All Java code MUST strictly follow the [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html).  
  - Configure your IDE to enforce these standards, and run automated formatters on every commit.
- **Mandatory Use of Lombok**:  
  - Use Lombok annotations (e.g., `@Getter`, `@Setter`, `@Builder`, `@ToString`, `@EqualsAndHashCode`) to reduce boilerplate.  
  - Ensure that Lombok annotations do not compromise class design, especially in classes that are serialized or require custom equality.
- **Naming Conventions**:  
  - Classes, methods, and variables MUST be named in clear, descriptive terms using camelCase (for methods and variables) and PascalCase (for classes).  
  - Constants MUST be in uppercase with underscores separating words.
- **Documentation and Comments**:  
  - All public classes and methods MUST have complete Javadoc comments.  
  - Inline comments MUST be used to clarify complex logic, but should not be used to explain self-evident code.

### 1.2 Exception Handling & Logging
- **Global Exception Management**:  
  - All controllers MUST use `@ControllerAdvice` to provide centralized exception handling.  
  - Define and use custom exception classes (e.g., `ResourceNotFoundException`, `InvalidInputException`) to represent specific error conditions.
- **Mandatory Error Response Structure**:  
  - Create a standard error response DTO containing at minimum an error code, error message, and a timestamp.  
  - All error responses MUST conform to this structure.
- **Logging Requirements**:  
  - Use Logback as the logging framework with OpenTelemetry integration.  
  - Log messages MUST include correlation IDs where applicable, and sensitive data MUST NEVER be logged.  
  - Use the following log level rules:  
    - **DEBUG**: Detailed diagnostic information, but disable in production.  
    - **INFO**: High-level application events (e.g., service start/stop, major state changes).  
    - **WARN**: Unexpected conditions that do not cause the application to fail.  
    - **ERROR**: All exceptions and errors that impact functionality.
- **Input Validation and Fail-Fast Principle**:  
  - Validate all incoming data using JSR-303 bean validation (`@Valid`, `@NotNull`, etc.).  
  - Code MUST fail fast by immediately rejecting invalid data and throwing exceptions.

### 1.3 Architectural Layers & Design Patterns
- **Layered Architecture Enforcement**:  
  - The application MUST strictly follow a three-tier structure: **Controller**, **Service**, and **Repository** layers.
  - **Controller Layer**: Must only handle HTTP requests, validate inputs, and delegate processing to the service layer.
  - **Service Layer**: Must contain all business logic and coordinate interactions with external systems.  
  - **Repository Layer**: Must contain all database access code using Spring Data JPA.
- **DTO Pattern Usage**:  
  - Define Data Transfer Objects (DTOs) for all API interactions.  
  - Entities MUST NOT be exposed directly to the API; mapping between entities and DTOs MUST be performed in the service layer using MapStruct or manual mapping as required.
- **Separation of Concerns**:  
  - External integrations (e.g., OpenAI, Synthesia) MUST be encapsulated in dedicated service classes.  
  - Controller classes MUST remain free of business logic.

### 1.4 Configuration & Security
- **Configuration Management**:  
  - All configuration values MUST be externalized using Spring Boot’s configuration properties and profiles.  
  - Sensitive configurations (e.g., API keys, DB credentials) MUST be stored in environment variables.
- **Input Security & OWASP Compliance**:  
  - All user inputs MUST be validated and sanitized using robust input validation mechanisms.  
  - The application MUST be developed in compliance with the [OWASP Top 10](https://owasp.org/www-project-top-ten/) security guidelines.
- **Secrets Management**:  
  - Secrets MUST NOT be hardcoded or stored in the repository.  
  - Use environment variables exclusively for storing secrets.

---

## 2. Frontend Coding Guidelines

### 2.1 Code Style & Formatting
- **Strict Adherence to Airbnb’s TypeScript Style Guide**:  
  - All frontend code MUST conform to the Airbnb style guide adapted for TypeScript.  
  - The provided ESLint and Prettier configurations MUST be used to enforce these rules.
- **Naming and File Conventions**:  
  - Use `PascalCase` for React component filenames and component names.  
  - All variables and function names MUST follow camelCase naming conventions.
- **TypeScript Best Practices**:  
  - Explicitly define types for function parameters, return types, and component props.  
  - Avoid using the `any` type; use precise type definitions or generics as required.

### 2.2 Project Structure & Component Organization
- **Folder Structure**:  
  - Organize components in a feature-based structure. For example, create folders for each major feature that contain components, services, and tests relevant to that feature.
  - Maintain a clear separation between reusable UI components (atoms, molecules) and feature-specific components.
- **Component Organization**:  
  - All React components MUST be written as functional components using hooks.  
  - Components MUST be kept small, focused, and single-responsibility.
- **Styling Guidelines**:  
  - Use Tailwind CSS and shadcn/ui exclusively for styling.  
  - Avoid inline styles except for dynamic styling that cannot be achieved via Tailwind’s utility classes.

### 2.3 State Management & API Integration
- **State Management**:  
  - Global state MUST be managed via React Context or a state management library such as Redux when necessary.  
  - Local component state MUST be managed with React hooks (`useState`, `useReducer`, etc.) as appropriate.
- **API Integration**:  
  - All API calls MUST be centralized in dedicated service modules.  
  - Use `async/await` for handling asynchronous operations and ensure that all API calls include robust error handling.
- **Data Fetching**:  
  - Use a library such as React Query if applicable for data fetching, caching, and synchronization.  
  - Ensure that loading states, error states, and retry mechanisms are implemented uniformly.

### 2.4 Error Handling & User Feedback
- **Error Handling**:  
  - All asynchronous operations MUST use try/catch blocks.  
  - Centralize error handling in a common error boundary component to catch rendering errors.
- **User Feedback**:  
  - All user actions that may result in an error MUST trigger a visible error message via toast notifications or modals.  
  - Loading indicators MUST be displayed during asynchronous operations, and appropriate fallback UIs MUST be provided for error states.
- **Form Validation**:  
  - All forms MUST have client-side validation using a library such as Formik or React Hook Form integrated with Yup for schema validation.  
  - Inline error messages MUST be displayed for invalid inputs.

### 2.5 Tooling, Linting & Formatting
- **Build System**:  
  - Use Vite for building the frontend application.  
  - Ensure that build scripts are included in the repository and integrated into the CI/CD pipeline.
- **ESLint and Prettier**:  
  - All code MUST pass the integrated ESLint + Prettier checks that enforce the Airbnb TypeScript style guide.  
  - Commit hooks MUST be used to automatically run linters on staged changes.
- **Version Control**:  
  - Follow strict Git workflows: commit messages MUST follow the conventional commits style.  
  - Feature branches MUST be created for new features, and pull requests MUST be peer-reviewed and approved before merging.

---

## Enforcement & Compliance
- **Code Reviews**:  
  - All code MUST be reviewed against these guidelines. Any deviations MUST be justified and approved by the technical lead.
- **Automated Checks**:  
  - CI/CD pipelines MUST include automated linting, formatting, and basic static analysis.  
  - Code that does not meet these standards MUST be rejected until all issues are resolved.

_End of Document_