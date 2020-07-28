const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');
const encryptLib = require('../modules/encryption');

//PUT ROUTE to save current meals from the day to orders table
router.put('/save-day/', rejectNotAdmin, (req, res) => {

    columnName = req.body.columnName

    console.log('column:', columnName);

    const queryText = `BEGIN;
                       ALTER TABLE orders ADD COLUMN $1 INT;
                       UPDATE "orders"
                       SET $2 = "current_meal"."number_of_meals"
                       FROM "current_meal" WHERE orders.dependent_id = current_meal.dependent_id;
                       COMMIT;`;

    const values = [columnName, columnName];
    console.log('put request: values:', values)
    pool.query(queryText, values)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //END PUT ROUTE

module.exports = router;