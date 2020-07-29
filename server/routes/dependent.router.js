const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');

// GET ROUTE for selecting all users
router.get('/', rejectNotAdmin, (req, res) => {
    const queryText = `SELECT "dependents"."id", "first_name", "last_name", "date_of_birth", "annual_income", "phone_number", "building_address1", "building_address2", "zip_code", "county_id", "county_name", "city", "special_request", "document_signed", "dietary_restrictions", "referral_id", "program_id", "menu_description", "referral_name", "program_name", "number_of_meals", "meal_choice", "menu_description" FROM "dependents"
                                JOIN "county" ON "dependents"."county_id" = "county"."id"
                                JOIN "referral" ON "dependents"."referral_id" = "referral"."id"
                                JOIN "program" ON "dependents"."program_id" = "program"."id"
                                JOIN "current_meal" ON "dependents"."id" = "current_meal"."dependent_id"
                                JOIN "menu" ON "current_meal"."meal_choice" = "menu"."id"
                                ;`;
    pool.query(queryText)
        .then((result) => {
            console.log(`GET Ratings database request successful`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
});// END GET ROUTE
// GET ROUTE for selecting single user info
router.get('/:id', rejectNotAdmin, (req, res) => {
    console.log(req.params.id)
    const queryText = `SELECT "dependents"."id", "first_name", "last_name", "date_of_birth", "annual_income", "phone_number", "building_address1", "building_address2", "zip_code", "county_id", "county_name", "city", "special_request", "document_signed", "dietary_restrictions", "referral_id", "program_id", "menu_description", "referral_name", "program_name", "number_of_meals", "meal_choice", "menu_description" FROM "dependents"
                                JOIN "county" ON "dependents"."county_id" = "county"."id"
                                JOIN "referral" ON "dependents"."referral_id" = "referral"."id"
                                JOIN "program" ON "dependents"."program_id" = "program"."id"
                                JOIN "current_meal" ON "dependents"."id" = "current_meal"."dependent_id"
                                JOIN "menu" ON "current_meal"."meal_choice" = "menu"."id"
                        WHERE "dependents"."id" = $1`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log(`GET Ratings database request successful`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
});//END GET ROUTE
//POST ROUTE add new dependent
router.post('/', rejectNotAdmin, (req, res) => {
    console.log('body:', req.body)
    const queryText = `WITH insert1 AS (
                        INSERT INTO "dependents"
                        ( "first_name", "last_name", "date_of_birth", 
                            "annual_income", "phone_number",
                            "building_address1", "building_address2", "zip_code", "county_id", "city",
                            "special_request", "dietary_restrictions",
                            "referral_id", "program_id", "document_signed")
                        VALUES
                        ( $1, $2, $3,
                        $4, $5,
                        $6, $7, $8, $9, $10,
                        $11, $12,
                        $13, $14, $15
                        )
                        RETURNING id )
                        INSERT INTO "current_meal"
                        ( "dependent_id", "number_of_meals", "meal_choice")
                        SELECT insert1.id, $16, $17
                        FROM insert1;  `;
    const values = [req.body.first_name, req.body.last_name, req.body.date_of_birth, req.body.annual_income, req.body.phone_number, req.body.building_address1, req.body.building_address2, req.body.zip_code, req.body.county_id, req.body.city, req.body.special_request, req.body.dietary_restrictions, req.body.referral_id, req.body.program_id, req.body.number_of_meals, req.body.meal_choice, req.body.document_signed];
    console.log('put request, values:', values)
    pool.query(queryText, values)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});

//PUT ROUTE to adjust all account info
router.put('/:id', rejectNotAdmin, (req, res) => {
    console.log('body:', req.body)
    const queryText = `UPDATE dependents
                        SET("first_name", "last_name", "date_of_birth",
                                "annual_income", "phone_number",
                                "building_address1", "building_address2", "zip_code", "county_id", "city",
                                "special_request", "dietary_restrictions",
                                "referral_id", "program_id", "document_signed")
                                =
                                ($1, $2, $3,
                                $4, $5,
                                $6, $7, $8, $9, $10,
                                $11, $12,
                                $13, $14, $15
                                )
                        WHERE "id" = $16;
                                `;
    const values = [req.body.first_name, req.body.last_name, req.body.date_of_birth, req.body.annual_income, req.body.phone_number, req.body.building_address1, req.body.building_address2, req.body.zip_code, req.body.county_id, req.body.city, req.body.special_request, req.body.dietary_restrictions, req.body.referral_id, req.body.program_id, , req.body.document_signed, req.params.id];
    console.log('put request, values:', values)
    pool.query(queryText, values)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
    })
});
module.exports = router;
