#!/bin/bash

# Start Spring Boot application in development mode
./mvnw spring-boot:run \
    -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005" \
    -Dspring.profiles.active=dev