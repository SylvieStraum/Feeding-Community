--DATABASE SET UP INSTRUCTIONS
--CREATE A DATABASE CALLED "feeding_community"
--COPY PASTE THE FOLLOWING INTO YOUR POSTICO, AND EXECUTE
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (200) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "account_type" INT NOT NULL DEFAULT 1
);

CREATE TABLE "dependents"
(
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (200),
    "last_name" VARCHAR (200),
    "phone_number" VARCHAR (30),
    "date_of_birth" DATE,
    "annual_income" INT,
    "building_address1" VARCHAR (300),
    "building_address2" VARCHAR (100),
    "zip_code" INT,
    "county_id" INT,
    "city" VARCHAR (200),
    "special_request" VARCHAR (400),
    "dietary_restrictions" VARCHAR(1000),
    "referral_id" INT,
    "program_id" INT,
    "current_meal_id" INT
);

-- should "number_of_meals" be tied to account or program?
CREATE TABLE "program"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (400),
    "document_signed" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "referral"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (400)
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

CREATE TABLE "current_meal"
(
    "id" SERIAL PRIMARY KEY,
    "number_of_meals" INT,
    "meal_choice" INT
);

CREATE TABLE "orders"
(
    "id" SERIAL PRIMARY KEY,
    "dependent_id" INT REFERENCES dependents("id")
);

INSERT INTO "county"
    ("county_name")
VALUES
    ('Aitikin'),('Anoka'),('Becker'),('Beltrami'),('Benton'),
    ('Big Stone'),('Blue Earth'),('Brown'),('Carlton'),('Carver'),
    ('Cass'),('Chippewa'),('Chisago'),('Clay'),('Clearwater'),('Cook'),
    ('Cottonwood'),('Crow Wing'),('Dakota'),('Dodge'),('Douglas'),('Faribault'),
    ('Fillmore'),('Freeborn'),('Goodhue'),('Grant'),('Hennepin'),('Houston'),('Hubbard'),
    ('Isanti'),('Itasca'),('Jackson'),('Kanabec'),('Kandiyohi'),('Kittson'),('Koochiching'),
    ('Lac qui Parle'),('Lake'),('Lake of the Woods'),('Le Sueur'),('Lincoln'),('Lyon'),('McLeod'),
    ('Mahnomen'),('Marshall'),('Martin'),('Meeker'),('Mille Lacs'),('Morrison'),('Mower'),('Murray'),
    ('Nicollet'),('Nobles'),('Norman'),('Olmstead'),('Otter Tail'),('Pennington'),('Pine'),('Pipestone'),
    ('Polk'),('Pope'),('Ramsey'),('Red Lake'),('Redwood'),('Renville'),('Rice'),('Rock'),('Roseau'),
    ('Saint Louis'),('Scott'),('Sherburne'),('Sibley'),('Stearns'),('Steele'),('Stevens'),
    ('Swift'),('Todd'),('Traverse'),('Wabasha'),('Wadena'),('Waseca'),('Washington'),
    ('Watonwan'),('Wilkin'),('Winona'),('Wright'),('Yellow Medicine'),
    ('N/A')
;

INSERT INTO "menu"
    ("description")
VALUES
    ('Meat Option'),
    ('Second Meat Option'),
    ('Veggie Option'),
    ('Special Request')
;

-- Below is how an insert into multiple tables will work
-- WITH insert1 AS (
-- INSERT INTO "user"
--     ("username", "password", "account_type")
-- VALUES
--     ('$1', '$2', 1)
-- RETURNING id
--    )
-- INSERT INTO "dependents"
--     ("user_id", "first_name", "last_name", "days")
-- SELECT insert1.id, '$3', '$4', '{"Monday": true, "Tuesday": false, "Wednesday": true , "Thursday": false, "Friday": true, "Saturday": false, "Sunday": true}'
-- FROM insert1                      
-- ;
