--DATABASE SET UP INSTRUCTIONS
--CREATE A DATABASE CALLED "feeding_community"
--COPY PASTE THE FOLLOWING INTO YOUR POSTICO, AND EXECUTE
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email_address" VARCHAR (200),
    "first_name" VARCHAR (200),
    "last_name" VARCHAR (200),
    "phone_number" VARCHAR (16),
    "date_of_birth" DATE,
    "annual_income" INT,
    "building_address" VARCHAR (300),
    "unit" VARCHAR (100),
    "city" VARCHAR (100),
    "zip_code" INT,
    "meal_choice" INT,
    "special_request" VARCHAR (400),
    "dietary_restrictions" VARCHAR(1000),
    "approval_status" BOOLEAN,
    "days" JSON,
    "account_type" INT
);
--"meal_choice" will be integer representing 1 for meat, 2 for veggies, 3 for special_request
--"special_request" will store input for special request
--"account_type" is our auth for user or admin, 1 for user, 2 for admin

CREATE TABLE "menu"
(
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (200)
);
