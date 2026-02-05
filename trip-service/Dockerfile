# Simple single-stage build
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Install wget for health check
RUN apk add --no-cache wget

# Add non-root user
RUN addgroup -S spring && adduser -S spring -G spring

# Copy pre-built JAR (must be built before docker build)
ARG SERVICE_NAME
COPY ${SERVICE_NAME}/build/libs/*.jar app.jar 2>/dev/null || echo "No JAR found - will use placeholder"

# Change ownership
RUN chown -R spring:spring /app || true

USER spring:spring

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=90s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", \
    "app.jar"]
