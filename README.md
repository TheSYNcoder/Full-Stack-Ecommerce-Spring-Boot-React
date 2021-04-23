# Spring-Boot-React


<p align="center">
  <img  src="https://github.com/TheSYNcoder/Full-Stack-Ecommerce-Spring-Boot-React/blob/https/logof.png">
</p>

This is a full stack web application made with spring boot and ReactJs in the frontend. Relevant blog articles on this are

* [Spring Boot and Docker Setup](https://medium.com/geekculture/a-full-stack-e-commerce-application-using-spring-boot-and-making-a-docker-container-eff46f6f4e14)
* [Integrating ReactJs with the backend](https://medium.com/geekculture/a-reactjs-web-application-with-a-spring-boot-backend-and-containerizing-it-using-docker-3eeaed8cb45a)

## Setting up Locally

* Install [docker](https://www.docker.com) and docker-compose on your system.
* Install `psql` for your system which is a client for the Postgresql database.
* Go the root directory of the system
* Run `docker-compose up --build`
* After the containers are up and running , run `psql -h 127.0.0.1 -d flamup -p 5432 -U postgres -c "\copy clothes FROM 'data2.csv' DELIMITER ',' CSV";`.

Now continue to https://localhost:8443, the application should be up and running.

### Caveats

* In case you are using chrome, go to chrome://flags/#allow-insecure-localhost and Enable the option that says "Allow invalid certificates for resources loaded from localhost".

