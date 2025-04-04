# Step 1: Initialize Spring Boot Backend - Detailed Design Plan

## 1. Design Decisions & Rationale

### 1.1 Project Structure
- **Decision**: Use Maven as the build tool
- **Rationale**: 
  - Maven is widely used in enterprise Java development
  - Provides better dependency management and build lifecycle
  - More consistent with Spring Boot conventions
- **Alternatives Considered**:
  - Gradle: While more flexible, Maven's XML-based configuration is more standardized
  - Ant: Too low-level for modern Spring Boot development

### 1.2 Java Version
- **Decision**: Use Java 21
- **Rationale**: 
  - Latest LTS release with cutting-edge features
  - Virtual Threads support for improved scalability
  - Pattern matching and Record Patterns for cleaner code
  - String Templates for better logging and response formatting
- **Alternatives Considered**:
  - Java 17: Previous LTS, but lacks modern features like Virtual Threads

### 1.3 Project Configuration
- **Decision**: Use YAML for application configuration
- **Rationale**: 
  - More readable than properties files
  - Better support for hierarchical configuration
  - Easier to maintain different profiles
- **Alternatives Considered**:
  - Properties files: Less readable, harder to maintain
  - JSON: Not as well supported by Spring Boot

## 2. Implementation Tasks Sequence

### 2.1 Project Setup
1. Create new Spring Boot project:
   ```xml
   <parent>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-parent</artifactId>
       <version>3.4.4</version>
   </parent>
   ```

2. Add essential dependencies:
   ```xml
   <dependencies>
       <!-- Spring Web -->
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-web</artifactId>
       </dependency>
       
       <!-- JPA -->
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-data-jpa</artifactId>
       </dependency>
       
       <!-- Flyway -->
       <dependency>
           <groupId>org.flywaydb</groupId>
           <artifactId>flyway-core</artifactId>
       </dependency>
       
       <!-- PostgreSQL -->
       <dependency>
           <groupId>org.postgresql</groupId>
           <artifactId>postgresql</artifactId>
           <scope>runtime</scope>
       </dependency>
       
       <!-- Lombok -->
       <dependency>
           <groupId>org.projectlombok</groupId>
           <artifactId>lombok</artifactId>
           <optional>true</optional>
       </dependency>
       
       <!-- Test dependencies -->
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-test</artifactId>
           <scope>test</scope>
       </dependency>
   </dependencies>
   ```

3. Configure basic application properties (application.yml):
   ```yaml
   spring:
     application:
       name: ppt-to-video-converter
     datasource:
       url: ${AIPRESENTER_DB_URL:jdbc:postgresql://localhost:5432/aipresenter}
       username: ${AIPRESENTER_DB_USER:postgres}
       password: ${AIPRESENTER_DB_PASSWORD:postgres}
     jpa:
       hibernate:
         ddl-auto: validate
     flyway:
       enabled: true
       locations: classpath:db/migration
   ```

### 2.2 Core Components Implementation

1. Create main application class:
   ```java
   @SpringBootApplication
   public class PptConverterApplication {
       public static void main(String[] args) {
           SpringApplication.run(PptConverterApplication.class, args);
       }
   }
   ```

2. Implement health controller (using Java 21 features):
   ```java
   @RestController
   @RequestMapping("/health")
   public class HealthController {
       private record HealthStatus(String status, String timestamp) {}
       
       @GetMapping
       public ResponseEntity<HealthStatus> healthCheck() {
           var now = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
           return ResponseEntity.ok(new HealthStatus("OK", now));
       }
   }
   ```

3. Create empty Flyway migration directory:
   - `src/main/resources/db/migration/`

### 2.3 Testing Implementation

1. Create HealthController test:
   ```java
   @WebMvcTest(HealthController.class)
   class HealthControllerTest {
       @Autowired
       private MockMvc mockMvc;
       
       @Test
       void healthCheckShouldReturnOk() throws Exception {
           mockMvc.perform(get("/health"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.status").value("OK"))
               .andExpect(jsonPath("$.timestamp").exists());
       }
   }
   ```

2. Create application context test:
   ```java
   @SpringBootTest
   class PptConverterApplicationTests {
       @Test
       void contextLoads() {
           // Will fail if application context cannot be loaded
       }
   }
   ```

## 3. Logging Implementation

### 3.1 Configuration
- Use Logback with OpenTelemetry integration as specified in coding guidelines
- Configure in logback-spring.xml:
  ```xml
  <configuration>
      <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
          <encoder>
              <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
          </encoder>
      </appender>
      
      <root level="INFO">
          <appender-ref ref="CONSOLE" />
      </root>
  </configuration>
  ```

### 3.2 Logging Strategy
- **DEBUG**: Detailed diagnostic information (disabled in production)
- **INFO**: Application lifecycle events (startup, shutdown)
- **WARN**: Unexpected but non-fatal conditions
- **ERROR**: Exceptions and errors impacting functionality

## 4. Test Execution & Validation

### 4.1 Local Testing
1. Run unit tests:
   ```bash
   mvn test
   ```

2. Verify test coverage with JaCoCo:
   ```bash
   mvn verify
   ```

### 4.2 Integration Testing
1. Start PostgreSQL (can use Docker):
   ```bash
   docker run -d -p 5432:5432 -e POSTGRES_DB=pptconverter postgres:latest
   ```

2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

3. Test health endpoint:
   ```bash
   curl http://localhost:8080/health
   ```

## 5. Results Verification

### 5.1 Success Criteria
1. Application builds successfully with Maven
2. All unit tests pass
3. Health endpoint returns JSON response with "OK" status and timestamp
4. Application connects to PostgreSQL without errors
5. Flyway is configured (no migrations needed yet)
6. Logging is properly configured and working

### 5.2 Verification Steps for Operator
1. Clone the repository
2. Start PostgreSQL using Docker (command provided above)
3. Run `mvn clean install` - should complete without errors
4. Run `mvn spring-boot:run` - application should start
5. Test health endpoint with curl or browser
6. Check logs for proper formatting and no errors

### 5.3 Common Issues & Solutions
1. **PostgreSQL Connection Failed**
   - Verify PostgreSQL is running
   - Check connection credentials
   - Ensure database exists

2. **Build Failures**
   - Check Java version (must be 21)
   - Verify Maven installation
   - Clear Maven cache if needed

3. **Test Failures**
   - Run tests with `-X` flag for debug output
   - Check test logs for specific failures
   - Verify test dependencies

## 6. Next Steps
Once this plan is approved and implemented:
1. Verify all success criteria are met
2. Document any issues encountered and their solutions
3. Proceed to Step 2: Basic Frontend Scaffolding & Integration