const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
// we might want to drop this route completely
router.post('/register', (req, res, next) => {  
  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const bod = req.body;
  console.log(bod);
  const queryText = `WITH insert1 AS (
                        INSERT INTO "user"
                        ("username", "password", "account_type")
                        VALUES
                        ($1, $2, 1)
                        RETURNING id )
                        INSERT INTO "dependents"
                        ( "id", "first_name", "last_name", "email_address", "date_of_birth", "annual_income", "phone_number",
                          "building_address1", "building_address2", "zip_code", "county_id", "city", "meal_choice",
                          "special_request", "dietary_restrictions", "approval_status", "days")
                        SELECT insert1.id, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 'false', $17
                        FROM insert1                      
                        ;`;
  const values = [username, password, bod.first_name, bod.last_name, bod.email_address, bod.date_of_birth, bod.annual_income, bod.phone_number, bod.building_address1, bod.building_address2, bod.zip_code, bod.county_id, bod.city, bod.meal_choice, bod.special_request, bod.dietary_restrictions, bod.days]
  
  console.log('query:', queryText, "values:", values)

  pool.query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500)
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
