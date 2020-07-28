const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');
const encryptLib = require('../modules/encryption');

//POST ROUTE to create new Admin account
router.post('/register/', rejectNotAdmin, (req, res) => {

    const password = encryptLib.encryptPassword(req.body.password);
    const email_address = req.body.email_address;

    console.log("password:", password, "email_addresss:", email_address)

    const queryText = `INSERT INTO "user"
                            ("email_address", "password", "account_type")
                            VALUES
                            ($1, $2, 2)                  
                            ;`;
    const values = [email_address, password]

    pool.query(queryText, values)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});//END POST ROUTE to create account


module.exports = router;