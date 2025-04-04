# AI-presenter
A web app that turns PowerPoint docs into entertaining videos presented by an avatar

## Technology Stack

- Backend: Spring Boot 3.4.4 with Java 21
- Frontend: React 18 with TypeScript and Vite 5
- UI: Tailwind CSS 3 with shadcn/ui components
- Database: PostgreSQL with Flyway migrations
- Testing: JUnit 5, Playwright for E2E tests

## Development Setup

### Prerequisites

- Java 21 or later
- Node.js v20.11.1 or later
- npm 10.2.4 or later
- PostgreSQL 15 or later

### Development Workflow

The application can be run in development mode with hot-reload capabilities for both frontend and backend.

1. Start the Spring Boot backend:
```bash
./scripts/run-backend-dev.sh
```
This will start the backend server at http://localhost:8080 with remote debugging enabled on port 5005.

2. In a new terminal, start the Vite development server:
```bash
./scripts/run-frontend-dev.sh
```
This will start the frontend development server at http://localhost:5173 with hot module replacement enabled.

The frontend dev server is configured to proxy all `/api` requests to the backend server.

### Building for Production

To build both frontend and backend into a single JAR:

```bash
./mvnw clean package
```

This will:
1. Install frontend dependencies
2. Build the frontend assets
3. Copy the built assets to `src/main/resources/static`
4. Build the Spring Boot application

To run the production build:

```bash
java -jar target/ai-presenter-0.0.1-SNAPSHOT.jar
```

The application will be available at http://localhost:8080

## Project Structure

```
.
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── styles/          # Global styles
│   │   └── lib/            # Utility functions
│   └── ...
├── src/
│   ├── main/
│   │   ├── java/           # Java source files
│   │   └── resources/      # Application resources
│   └── test/               # Test files
├── scripts/                 # Development scripts
└── docs/                    # Project documentation
```

## Available Scripts

- `scripts/run-backend-dev.sh`: Start the Spring Boot backend in development mode
- `scripts/run-frontend-dev.sh`: Start the Vite development server
- `mvnw spring-boot:run`: Run the backend directly
- `cd frontend && npm run dev`: Run the frontend directly
- `mvnw clean package`: Build the entire application

## Testing

### Backend Tests
```bash
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### End-to-End Tests
```bash
cd frontend
npm run test:e2e
```

## Contributing

1. Ensure you have the correct versions of Java and Node.js installed
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
