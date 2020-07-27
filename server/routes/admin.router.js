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
});// END GET ROUTE

// GET ROUTE for selecting single user info
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
});//END GET ROUTE

//POST ROUTE to create new Admin account
router.post('/register/', rejectNotAdmin, (req, res) => {

    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    const email_address = req.body.email_address;

    const queryText = `WITH insert1 AS (
                        INSERT INTO "user"
                        ("username", "password", "account_type")
                        VALUES
                        ($1, $2, 1)
                        RETURNING id )
                        INSERT INTO "admin"
                        ( "admin_id", "email_address")
                        SELECT insert1.id, $3,
                        FROM insert1                      
                        ;`;
    const values = [username, password, email_address]

    pool.query(queryText, values)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});//END POST ROUTE to create account


//PUT ROUTE to adjust all account info
router.put('/user/:id', rejectNotAdmin, (req, res) => {
    
    console.log('body:', req.body)
    const queryText = `UPDATE dependents
                        SET  ("first_name", "last_name", "email_address", "date_of_birth", "annual_income",
                        "building_address1", "building_address2", "zip_code", "county_id", "city", "meal_choice",
                        "special_request", "dietary_restrictions", "approval_status", "days")
                        = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                        WHERE "user_id" = $16;`;

    const values = [req.body.first_name, req.body.last_name, req.body.email_address, req.body.date_of_birth, req.body.annual_income, req.body.building_address1, req.body.building_address2, req.body.zip_code, req.body.county_id, req.body.city, req.body.meal_choice, req.body.special_request, req.body.dietary_restrictions, req.body.approval_status, req.body.days, req.params.id];
    console.log('put request, values:', values)
    pool.query(queryText, values)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
    })
});

//PUT ROUTE to approve single user
router.put('/approve/:id', rejectNotAdmin, (req, res) => {

    console.log('body:', req.body)
    const queryText = `UPDATE dependents
                        SET  ("approval_status")
                        = ($1)
                        WHERE "user_id" = $2;`;

    const values = [req.body.approval_status, req.params.id];
    console.log('put request, values:', values)
    pool.query(queryText, values)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});//END PUT ROUTE

//PUT ROUTE to change menu
router.put('/menu/', rejectNotAdmin, (req, res) => {

    console.log('body:', req.body)
    const queryText = `UPDATE "menu" AS m
                            SET  "description" = c."description"
                            FROM (VALUES
                            (1, $1),(2, $2),(3, $3))
                            AS c("id", "description")
                            WHERE c."id" = m."id" ;`;

    const values = [req.body.option1, req.body.option2, req.body.veggie];
    console.log('put request, values:', values)
    pool.query(queryText, values)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //END PUT ROUTE

module.exports = router;