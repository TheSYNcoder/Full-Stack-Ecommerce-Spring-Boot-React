#FROM maven:3.6.0-jdk-11-slim AS build
FROM maven:3.6.1-jdk-8-slim AS build
RUN mkdir -p workspace
WORKDIR workspace
COPY pom.xml /workspace
COPY src /workspace/src
COPY frontend /workspace/frontend
COPY data2.csv /workspace
RUN mvn -f pom.xml clean install -DskipTests=true
##RUN ./mvnw clean package -DskipTests
#
##FROM adoptopenjdk/openjdk11:alpine-jre
FROM openjdk:16-ea-29-oraclelinux8
COPY --from=build /workspace/target/*.jar app.jar
#EXPOSE 8080
#ENTRYPOINT ["java","-jar","app.jar"]


#FROM adoptopenjdk/openjdk11:alpine-jre

#COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]