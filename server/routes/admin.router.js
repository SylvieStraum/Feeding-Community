const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');

// GET ROUTE for selecting all users
router.get('/', rejectNotAdmin, (req, res) => {
    const queryText = `SELECT * FROM "dependents"`;
    pool.query(queryText)
        .then((result) => {
            console.log(`GET Ratings database request successful`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Ratings for teas:`, error);
            res.sendStatus(500);
        });
});

// GET ROUTE for selecting single user
router.get('/user/:id', rejectNotAdmin, (req, res) => {
    const queryText = `SELECT * FROM "user"
                        WHERE "id" = $1`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log(`GET Ratings database request successful`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Ratings for teas:`, error);
            res.sendStatus(500);
        });
});

/**
 * Put route template
 */
router.put('/user/:id', rejectNotAdmin, (req, res) => {
    
    console.log('body:', req.body)
    const queryText = `UPDATE dependents
                        SET  ("first_name", "last_name", "email_address", "date_of_birth", "annual_income",
                        "building_address1", "building_address2", "zip_code", "county_id", "city", "meal_choice",
                        "special_request", "dietary_restrictions", "approval_status", "days")
                        = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                        WHERE "user_id" = $16;`;

    const values = [req.body.first_name, req.body.last_name, req.body.email_address, req.body.date_of_birth, req.body.annual_income, req.body.building_address1, req.body.building_address2, req.body.zip_code, req.body.county_id, req.body.city, req.body.meal_choice, req.body.special_request, req.body.dietary_restrictions, req.body.approval_status, req.body.days, req.params.id];
    console.log('post request, values:', values)
    pool.query(queryText, values)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
    })
});

module.exports = router;