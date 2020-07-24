--DATABASE SET UP INSTRUCTIONS
--CREATE A DATABASE CALLED "feeding_community"
--COPY PASTE THE FOLLOWING INTO YOUR POSTICO, AND EXECUTE
CREATE TABLE "account"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "account_type" INT NOT NULL
);

CREATE TABLE "user"
(
    "user_id" INT PRIMARY KEY UNIQUE NOT NULL REFERENCES "account"(id),
    "first_name" VARCHAR (200),
    "last_name" VARCHAR (200),
    "email_address" VARCHAR (200),
    "date_of_birth" DATE,
    "annual_income" INT,
    "building_address1" VARCHAR (300),
    "building_address2" VARCHAR (100),
    "zip_code" INT,
    "county_id" INT,
    "city" VARCHAR (200),
    "meal_choice" INT,
    "special_request" VARCHAR (400),
    "dietary_restrictions" VARCHAR(1000),
    "approval_status" BOOLEAN DEFAULT FALSE,
    "days" JSON
);

CREATE TABLE "admin"
(
    "admin_id" INT PRIMARY KEY NOT NULL REFERENCES "account"(id),
    "email_address" VARCHAR (200)
);

CREATE TABLE "menu"
(
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (200)
);

CREATE TABLE "county"
(
    "id" SERIAL PRIMARY KEY,
    "county_name" VARCHAR (200)
);

-- Below is how an insert into multiple tables will work
-- WITH insert1 AS (
-- INSERT INTO "account"
--     ("username", "password", "account_type")
-- VALUES
--     ('$1', '$2', 1)
-- RETURNING id
--    )
-- INSERT INTO "user"
--     ("user_id", "first_name", "last_name", "days")
-- SELECT insert1.id, '$3', '$4', '{"Monday": true, "Tuesday": false, "Wednesday": true , "Thursday": false, "Friday": true, "Saturday": false, "Sunday": true}'
-- FROM insert1                      
-- ;