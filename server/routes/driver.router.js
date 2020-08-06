const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotDriver } = require('../modules/driver-authentication-middleware');

// GET ROUTE for selecting all users associated with specific route
router.get('/:id', rejectNotDriver, (req, res) => {
    const queryText = `SELECT "dependents"."id", "first_name", "last_name", "phone_number", "building_address1", "building_address2", "zip_code", "city", "special_request", "document_signed", "number_of_meals", "meal_choice", "menu_description" FROM "dependents"
                                JOIN "county" ON "dependents"."county_id" = "county"."id"
                                JOIN "referral" ON "dependents"."referral_id" = "referral"."id"
                                JOIN "program" ON "dependents"."program_id" = "program"."id"
                                JOIN "current_meal" ON "dependents"."id" = "current_meal"."dependent_id"
                                JOIN "menu" ON "current_meal"."meal_choice" = "menu"."id"
                                WHERE "route"."id" = $1
                                ORDER BY "dependents"."id" ASC
                                ;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log(`GET database request successful`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
});// END GET ROUTE


module.exports = router;
