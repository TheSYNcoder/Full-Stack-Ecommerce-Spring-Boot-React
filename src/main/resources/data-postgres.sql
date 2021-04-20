
--
--

DROP TABLE IF EXISTS application_user;

drop sequence if exists student_sequence;


create table if not exists application_user (
      id int8 not null,
      app_user_role varchar(255),
      email varchar(255),
      first_name varchar(255),
      gender varchar(255),
      last_name varchar(255),
      password varchar(255),
      username varchar(255),
      primary key (id)
);

create table if not exists clothes
(
    id int not null
        constraint clothes_pk
            primary key,
    sex varchar,
    dresstype varchar not null,
    image varchar not null,
    price varchar not null,
    arrival varchar,
    discount varchar not null
);

create sequence student_sequence start 1 increment 1;

--
-- CREATE TABLE SPRING_SESSION (
--     PRIMARY_ID CHAR(36) NOT NULL,
--     SESSION_ID CHAR(36) NOT NULL,
--     CREATION_TIME BIGINT NOT NULL,
--     LAST_ACCESS_TIME BIGINT NOT NULL,
--     MAX_INACTIVE_INTERVAL INT NOT NULL,
--     EXPIRY_TIME BIGINT NOT NULL,
--     PRINCIPAL_NAME VARCHAR(100),
--     CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
-- );
--
-- CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID);
-- CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME);
-- CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);
--
-- CREATE TABLE SPRING_SESSION_ATTRIBUTES (
--    SESSION_PRIMARY_ID CHAR(36) NOT NULL,
--    ATTRIBUTE_NAME VARCHAR(200) NOT NULL,
--    ATTRIBUTE_BYTES BYTEA NOT NULL,
--    CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
--    CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION(PRIMARY_ID) ON DELETE CASCADE
-- );


