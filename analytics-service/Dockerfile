# Multi-stage build for optimized image size
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# Copy Gradle wrapper and project files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY gradle.properties .

# Copy all subproject build files
COPY */build.gradle ./

# Download dependencies (cached layer)
RUN ./gradlew dependencies --no-daemon || return 0

# Copy source code
COPY . .

# Build the application
ARG SERVICE_NAME
RUN ./gradlew :${SERVICE_NAME}:clean :${SERVICE_NAME}:bootJar --no-daemon

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Add non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy JAR from builder
ARG SERVICE_NAME
COPY --from=builder /app/${SERVICE_NAME}/build/libs/*.jar app.jar

# Expose port (will be overridden by docker-compose)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", \
    "app.jar"]
