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
    "document_signed" BOOLEAN DEFAULT FALSE
);

-- should "number_of_meals" be tied to account or program?
CREATE TABLE "program"
(
    "id" SERIAL PRIMARY KEY,
    "program_name" VARCHAR (400),
    "default_no_meals" INT
);

CREATE TABLE "referral"
(
    "id" SERIAL PRIMARY KEY,
    "referral_name" VARCHAR (400)
);

CREATE TABLE "menu"
(
    "id" SERIAL PRIMARY KEY,
    "menu_description" VARCHAR (200)
);

CREATE TABLE "county"
(
    "id" SERIAL PRIMARY KEY,
    "county_name" VARCHAR (200)
);

CREATE TABLE "current_meal"
(
    "id" SERIAL PRIMARY KEY,
    "dependent_id" INT REFERENCES dependents("id"),
    "number_of_meals" INT,
    "meal_choice" INT
);

CREATE TABLE "orders"
(
    "id" SERIAL PRIMARY KEY,
    "date" DATE,
    "dependent_id" INT,
    "number_of_meals" INT,
    "meal_choice" INT
);

ALTER TABLE "orders"
	ADD CONSTRAINT date_dependent_int_unique
    	UNIQUE ("dependent_id", "date") ;

-- Insert for only the seven metro counties
-- DO NOT INSERT THIS IF YOU INSTEAD WANT TO INSERT ALL COUNTIES
INSERT INTO "county"("county_name")
VALUES ('Anoka'),('Carver'),('Dakota'),('Hennepin'),('Scott'),('Ramsay'),('Washington'),('N/A');

-- Insert for partner organizations to allow feeding communities to track who signed these people up
INSERT INTO "referral" ("referral_name")
VALUES ('Feeding Communities'),('Minneapolis Public Housing Agency'),('Commonbond Communities'),('Lakes Day Care'),('Ebyan ADC'), ('MN Senior Center'), ('Nurturing Hands Day Center'), ('Umatul Islam');

-- Insert for which delivery program they fall under based on qualificiations
INSERT INTO "program" ("program_name", "default_no_meals")
VALUES ('Ramsay County', 3),('Meals on Wheels', 1);

-- 
INSERT INTO "menu" ("menu_description")
VALUES ('Chicken or Beef'),('Fish'),('Veggie Only'),('Special Request');

-- DO NOT INSERT UNLESS YOU WANT TO ADD ALL COUNTIES
-- DO NOT INSERT IF YOU'VE ALREADAY INSERTED OTHER COUNTIES
-- -- Insert for all mn counties
-- INSERT INTO "county"
--     ("county_name")
-- VALUES
--     ('Aitikin'),('Anoka'),('Becker'),('Beltrami'),('Benton'),
--     ('Big Stone'),('Blue Earth'),('Brown'),('Carlton'),('Carver'),
--     ('Cass'),('Chippewa'),('Chisago'),('Clay'),('Clearwater'),('Cook'),
--     ('Cottonwood'),('Crow Wing'),('Dakota'),('Dodge'),('Douglas'),('Faribault'),
--     ('Fillmore'),('Freeborn'),('Goodhue'),('Grant'),('Hennepin'),('Houston'),('Hubbard'),
--     ('Isanti'),('Itasca'),('Jackson'),('Kanabec'),('Kandiyohi'),('Kittson'),('Koochiching'),
--     ('Lac qui Parle'),('Lake'),('Lake of the Woods'),('Le Sueur'),('Lincoln'),('Lyon'),('McLeod'),
--     ('Mahnomen'),('Marshall'),('Martin'),('Meeker'),('Mille Lacs'),('Morrison'),('Mower'),('Murray'),
--     ('Nicollet'),('Nobles'),('Norman'),('Olmstead'),('Otter Tail'),('Pennington'),('Pine'),('Pipestone'),
--     ('Polk'),('Pope'),('Ramsey'),('Red Lake'),('Redwood'),('Renville'),('Rice'),('Rock'),('Roseau'),
--     ('Saint Louis'),('Scott'),('Sherburne'),('Sibley'),('Stearns'),('Steele'),('Stevens'),
--     ('Swift'),('Todd'),('Traverse'),('Wabasha'),('Wadena'),('Waseca'),('Washington'),
--     ('Watonwan'),('Wilkin'),('Winona'),('Wright'),('Yellow Medicine'),
--     ('N/A')
-- ;


-- -- Dummy Insert for testing
-- WITH insert1 AS (
-- INSERT INTO "dependents"
WITH insert1 AS (
INSERT INTO "dependents"
    ( "first_name", "last_name", "date_of_birth",
    "annual_income", "phone_number",
    "building_address1", "building_address2", "zip_code", "county_id", "city",
    "special_request", "dietary_restrictions",
    "referral_id", "program_id")
VALUES
    ( 'first name', 'last name', '06-02-2020',
        '25000', '(XXX) XXX-XXXX',
        'Building St.', 'Unit 6', '55408', '4', 'city',
        'special', 'restrict',
        1, 2
)
RETURNING id )
INSERT INTO "current_meal"
    ( "dependent_id", "number_of_meals", "meal_choice")
SELECT insert1.id, 3, 4
FROM insert1;  


-- Insert that copies current meals into orders table
-- Run this after inserting a few people into db, can only be run once per day
INSERT INTO "orders" ("date", "dependent_id", "number_of_meals", "meal_choice")
SELECT current_timestamp, "dependent_id", "number_of_meals", "meal_choice" FROM "current_meal"
ORDER BY "dependent_id" ASC
;