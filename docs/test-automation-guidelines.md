# Automated Testing Guidelines Document

This document establishes mandatory automated testing standards for the project. All developers MUST adhere to these guidelines. There are separate sections for the backend unit tests (Java API level) and the frontend end-to-end tests (using Playwright). Any deviations require explicit approval from the technical lead.

---

## Table of Contents
1. [Backend Automated Testing Guidelines](#backend-automated-testing-guidelines)
   - [1.1 Testing Frameworks & Tools](#11-testing-frameworks--tools)
   - [1.2 Unit Testing for Java API](#12-unit-testing-for-java-api)
   - [1.3 Test Organization and Naming Conventions](#13-test-organization-and-naming-conventions)
   - [1.4 Use of Mocks, Stubs, and Fakes](#14-use-of-mocks-stubs-and-fakes)
   - [1.5 Test Coverage Requirements](#15-test-coverage-requirements)
   - [1.6 Best Practices and Prohibited Patterns](#16-best-practices-and-prohibited-patterns)
2. [Frontend End-to-End Testing Guidelines (Playwright)](#frontend-end-to-end-testing-guidelines-playwright)
   - [2.1 Testing Frameworks & Tools](#21-testing-frameworks--tools)
   - [2.2 Test Organization and Structure](#22-test-organization-and-structure)
   - [2.3 Writing End-to-End Tests](#23-writing-end-to-end-tests)
   - [2.4 Test Data Management and Environment Setup](#24-test-data-management-and-environment-setup)
   - [2.5 Best Practices for Playwright Tests](#25-best-practices-for-playwright-tests)
3. [Enforcement & Compliance](#enforcement--compliance)

---

## 1. Backend Automated Testing Guidelines

### 1.1 Testing Frameworks & Tools
- **JUnit 5**: All unit tests MUST be written using JUnit 5.
- **Mockito**: Use Mockito for creating mocks and stubbing behaviors.
- **Spring Boot Testing**: Utilize Spring Boot test annotations (e.g., `@WebMvcTest`, `@SpringBootTest`, `@DataJpaTest`) as appropriate, but ensure unit tests remain isolated from external systems.
- **JaCoCo**: All projects MUST integrate JaCoCo for code coverage analysis, with the CI pipeline enforcing the minimum thresholds.

### 1.2 Unit Testing for Java API
- **Scope**: Every public method in all API endpoints MUST have comprehensive unit tests. This includes:
  - **Input Validation**: Tests MUST assert that invalid input is rejected according to business rules.
  - **Business Logic**: Test that the service layer correctly processes valid inputs.
  - **Response Verification**: API endpoints MUST return the correct HTTP status codes and response bodies as defined in the contract.
- **Isolation**: Unit tests MUST NOT call external APIs or perform actual database operations. Use mocks for dependencies.
- **Coverage**: Each unit test MUST cover positive, negative, and edge cases. Aim for 80% or higher coverage on all new API endpoints.

### 1.3 Test Organization and Naming Conventions
- **Directory Structure**: All test classes MUST reside under `src/test/java` following the same package structure as the production code.
- **File Naming**: 
  - Test class names MUST end with `Test` (e.g., `UserControllerTest.java`).
  - Test methods MUST follow the naming convention `should[ExpectedBehavior]When[Condition]` (e.g., `shouldReturnBadRequestWhenInputIsInvalid`).
- **Documentation**: Each test file MUST include a header comment describing the purpose of the tests and any pertinent setup details.

### 1.4 Use of Mocks, Stubs, and Fakes
- **Mockito Usage**:
  - Use `@Mock` for dependencies and `@InjectMocks` for the class under test.
  - Verify interactions with dependencies using `verify()`.
- **Stubs and Fakes**: When a dependency’s behavior is complex, create dedicated stubs or fake implementations. NEVER call the actual service or repository methods in a unit test.
- **Isolation**: Ensure that tests are isolated; no shared state is allowed across test methods.

### 1.5 Test Coverage Requirements
- **Mandatory Coverage**: New API endpoints MUST have unit tests that achieve at least 80% code coverage.
- **CI Enforcement**: The CI pipeline MUST fail if the code coverage drops below the agreed threshold.
- **Review**: Code reviews MUST include a review of unit test coverage and effectiveness.

### 1.6 Best Practices and Prohibited Patterns
- **Single Responsibility**: Each unit test MUST test a single behavior. Do NOT combine multiple test cases in one method.
- **No Test Interdependency**: Tests MUST be independent and run in any order. Do NOT rely on shared state.
- **Descriptive Assertions**: Use clear, descriptive assertions. Avoid generic assertions that do not provide meaningful error messages.
- **Avoid Hard-coded Delays**: Tests MUST NOT use Thread.sleep() or similar constructs. Instead, use appropriate wait mechanisms if needed.
- **Refactor Common Logic**: Common test setup and teardown logic MUST be abstracted into helper methods or annotated with `@BeforeEach`/`@AfterEach`.

---

## 2. Frontend End-to-End Testing Guidelines (Playwright)

### 2.1 Testing Frameworks & Tools
- **Playwright**: All end-to-end tests MUST be written using Playwright with TypeScript.
- **Configuration**: Configure Playwright to run tests in headless mode for CI. Tests MUST be executable across multiple browsers (Chromium, Firefox, and WebKit).

### 2.2 Test Organization and Structure
- **Directory Structure**: End-to-end tests MUST be placed in a dedicated directory (e.g., `tests/e2e`).
- **File Naming**: 
  - Test files MUST be named following the pattern `FeatureName.spec.ts` (e.g., `LoginFlow.spec.ts`).
  - Group tests by feature, and ensure each file contains tests related to one major user flow.
- **Separation of Concerns**: Do NOT mix unit tests with end-to-end tests. End-to-end tests are solely for testing complete user journeys.

### 2.3 Writing End-to-End Tests
- **User Simulation**: Tests MUST simulate real user behavior, including navigation, form submissions, and interactions with UI elements.
- **Selectors**: Use `data-testid` attributes for selecting elements. Do NOT rely on CSS classes or text content which may change over time.
- **Assertions**: All interactions MUST be followed by assertions that verify:
  - The presence of UI elements.
  - Correct page navigation.
  - Expected text content or error messages.
- **Avoid Fixed Delays**: Use Playwright's built-in wait mechanisms (e.g., `page.waitForSelector()`) rather than hard-coded timeouts.
- **Cleanup**: Ensure tests clean up after themselves (e.g., log out, reset test data) so that no state persists between test runs.

### 2.4 Test Data Management and Environment Setup
- **Test Environment**: Use dedicated test environments and accounts. Test data MUST be consistent across runs.
- **Data Reset**: Prior to executing tests, the environment MUST be reset to a known state. Automated scripts or database fixtures MUST be used for this purpose.
- **Configuration**: End-to-end tests MUST be configured to use environment variables for endpoints and credentials.

### 2.5 Best Practices for Playwright Tests
- **Resilient Selectors**: Use stable selectors (preferably `data-testid` attributes) to avoid test breakage from UI changes.
- **Cross-Browser Testing**: Ensure that every end-to-end test runs on Chromium, Firefox, and WebKit. Configure CI to run these tests in parallel.
- **Error Reporting**: Capture screenshots and logs on test failure. Test scripts MUST include hooks to automatically store artifacts on failure.
- **Performance Considerations**: End-to-end tests MUST complete in a reasonable timeframe. Optimize tests by reducing unnecessary steps and reusing setup where possible.
- **Documentation**: Each test file MUST include comments explaining the purpose of the tests and any non-obvious steps.

_End of Document_