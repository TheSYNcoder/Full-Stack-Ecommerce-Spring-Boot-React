FROM 3.8.1-jdk-11-slim AS build
RUN mkdir -p workspace
WORKDIR workspace
COPY pom.xml /workspace
COPY src /workspace/src
COPY frontend /workspace/frontend
COPY data2.csv /workspace/data.csv
RUN mvn -f pom.xml clean package

FROM openjdk:11-alpine
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
