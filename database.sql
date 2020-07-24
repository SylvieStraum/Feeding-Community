--DATABASE SET UP INSTRUCTIONS
--CREATE A DATABASE CALLED "feeding_community"
--COPY PASTE THE FOLLOWING INTO YOUR POSTICO, AND EXECUTE
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "name" VARCHAR (200),
    "email_address" VARCHAR (200),
    "date_of_birth" DATE,
    "annual_income" INT,
    "building_address" VARCHAR (300),
    "unit" VARCHAR (100),
    "zip_code" INT,
    "meal_choice" INT,
    "special_request" VARCHAR (400),
    "dietary_restrictions" VARCHAR(1000),
    "approval_status" BOOLEAN,
    "days" JSON,
    "account_type" INT
);

CREATE TABLE "menu"
(
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (200)
);
