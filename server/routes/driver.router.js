const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');
const { rejectNotDriver } = require('../modules/driver-authentication-middleware');

//GET route to dependents for driver view
//left in all fields for dependent so that in the future the driver can edit while in person, as requested.
// router.get('/', rejectNotAdmin, (req, res) => {
//     const queryText = `SELECT "dependents"."id", "first_name", "last_name", "date_of_birth", "annual_income", "phone_number", "building_address1", "building_address2", "zip_code", "county_id", "county_name", "city", "special_request", "document_signed", "dietary_restrictions", "referral_id", "program_id", "menu_description", "referral_name", "program_name", "number_of_meals", "meal_choice", "menu_description", "route_id", "route_name" FROM "dependents"


// GET ROUTE for selecting all users associated with specific route
router.get('/', rejectNotDriver, (req, res) => {
    const queryText = `SELECT "dependents"."id", "first_name", "last_name", "phone_number", "building_address1", "building_address2", "zip_code", "city", "special_request", "document_signed", "number_of_meals", "meal_choice", "menu_description", "route_id", "route_name", "dependents"."program_id" FROM "dependents"
                                JOIN "county" ON "dependents"."county_id" = "county"."id"
                                JOIN "referral" ON "dependents"."referral_id" = "referral"."id"
                                JOIN "program" ON "dependents"."program_id" = "program"."id"
                                JOIN "current_meal" ON "dependents"."id" = "current_meal"."dependent_id"
                                JOIN "menu" ON "current_meal"."meal_choice" = "menu"."id"
                                JOIN "route" ON "dependents"."route_id" = "route"."id"
                                WHERE "route"."user_id" = $1
                                ORDER BY "dependents"."id" ASC
                                ;`;
        pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error with driver GET Request:`, error);
            res.sendStatus(500);
        });
});// end get route


router.get('/routes', rejectNotDriver, (req, res) => {
    sqlText = `SELECT * FROM route
                    ORDER BY "id" ASC;`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log('error with GET driver routes', err)
            res.sendStatus(500)
        })
});

module.exports = router;
