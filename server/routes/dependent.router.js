const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require(`../modules/admin-authentication-middleware`);

//get request where it gets user specific information.
router.get('/', (req, res) => {
    sqlText = `
    SELECT *
    FROM dependents
    WHERE user_id = $1`
    pool.query(sqlText, [req.user.id])
        .then(result => {
            console.log('in dependant get information')
            res.send(result.rows)
        })
        .catch(err => {
            console.log('error in dependant get', err)
            res.sendStatus(500)
        })
});

//this put plans on a modular approach to editing profile information. 
//send up the key/value pair with key as column to target and value as new value for the update
//ended up adopting cams query style as it made more sense 
router.put('/user/:id', rejectNotAdmin, (req, res) => {
    
    console.log('body:', req.body)
    const queryText = `UPDATE dependents
                        SET  ("first_name", "last_name", "email_address", "date_of_birth", "annual_income", "phone_number",
                        "building_address1", "building_address2", "zip_code", "county_id", "city", "meal_choice",
                        "special_request", "dietary_restrictions", "approval_status", "days")
                        = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                        WHERE "user_id" = $17;`;

    const values = [req.body.first_name, 
                    req.body.last_name, 
                    req.body.email_address, 
                    req.body.date_of_birth, 
                    req.body.annual_income, 
                    req.body.phone_number, 
                    req.body.building_address1, 
                    req.body.building_address2, 
                    req.body.zip_code, 
                    req.body.county_id, 
                    req.body.city, 
                    req.body.meal_choice, 
                    req.body.special_request, 
                    req.body.dietary_restrictions, 
                    req.body.approval_status, 
                    req.body.days, 
                    req.params.id];
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