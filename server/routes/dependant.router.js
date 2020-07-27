const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
router.put('/', (req, res) => {
    sqlText = `
UPDATE dependents
SET “first_name”=$1,
“last_name”=$2,
 “email_address”=$3, 
 “date_of_birth”=$4, 
 “annual_income”=$5, 
 “building_address1"=$6, 
 “building_address2”=$7, 
 “zip_code”=$8, 
 “county_id”=$9, 
 “city”=$10, 
 “meal_choice”=$11, 
 “special_request”=$12, 
 “dietary_restrictions”=$13, 
 “approval_status”=$14, 
 “days”=$15
WHERE user_id = $16 
`
    values = [ req.body.first_name, 
        req.body.last_name, 
        req.body.email_address, 
        req.body.date_of_birth, 
        req.user.annual_income,
        req.user.building_address1,
        req.user.building_address2,
        req.user.zip_code,
        req.user.county_id,
        req.user.city,
        req.user.meal_choice,
        req.user.special_request,
        req.user.dietary_restrictions,
        req.user.approval_status,
        req.user.days]
    pool.query(sqlText, values)
        .then(result => {
            console.log('success with PUT')
            res.sendStatus(200)
        })
        .catch(err => {
            console.log('error in dependant PUT', err)
            res.sendStatus(500)
        })
});

module.exports = router;