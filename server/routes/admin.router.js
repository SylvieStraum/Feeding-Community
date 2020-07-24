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
    const queryText = `UPDATE "dependents"
                    SET ${req.body.column} = ${req.body.value}
                    WHERE "user_id" = ${req.params.id};`

    console.log('post request, user id:', req.params.id, 'to change:', req.body.column, req.body.value)
    if (req.isAuthenticated(queryText)) {
        pool.query(queryText  )
            .then((results) => {
                res.send(results);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;