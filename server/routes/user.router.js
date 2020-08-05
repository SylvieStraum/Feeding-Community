const express = require('express');
const { rejectNotDriver } = require('../modules/driver-authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectNotDriver, (req, res) => {
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
  const queryText = `INSERT INTO "user"
                        ("username", "password", "account_type")
                        VALUES
                        ($1, $2, 10)
                      ;`;
  const values = [username, password]
  
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
  console.log(req.body);
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
