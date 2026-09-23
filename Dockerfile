# ==============================================================================
# Multi-Stage Dockerfile for High-Scale FinTech Portfolio
# Optimized for Render.com / Railway / Koyeb Free Tiers (512MB RAM)
# ==============================================================================

# Stage 1: Build JAR using Eclipse Temurin 21
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy Maven wrapper & POM for dependency caching
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B || true

# Copy source and build executable JAR
COPY src src
RUN ./mvnw clean package -DskipTests

# Stage 2: Lightweight JRE 21 Runtime
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy packaged JAR
COPY --from=build /app/target/*.jar app.jar

# Cloud port configuration (Render automatically injects $PORT)
ENV PORT=8082
EXPOSE 8082

# JVM Memory Tuning:
# -XX:+UseSerialGC: Drastically reduces memory overhead on single-core / shared vCPUs
# -Xmx384m: Caps maximum heap so total container RSS never exceeds 512MB free tier limits
ENTRYPOINT ["sh", "-c", "java -XX:+UseSerialGC -Xmx384m -Dserver.port=${PORT} -jar app.jar"]
