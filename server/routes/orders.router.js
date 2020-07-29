const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');

// GET ROUTE to get all orders
router.get('/', rejectNotAdmin, (req, res) => {

    const queryText = `SELECT * FROM "orders";`;
    pool.query(queryText)
        .then((result) => {
            console.log(`GET Ratings database request successful`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
}); // END GET ROUTE


// GET ROUTE to get total of today's orders
router.get('/today/', rejectNotAdmin, (req, res) => {

    let today = new Date();
    let date = '';
    if (today.getMonth() < 10) {
        if (today.getDate() < 10) {
            date = today.getFullYear() + '_0' + (today.getMonth() + 1) + '_0' + today.getDate();
        } else {
            date = today.getFullYear() + '_0' + (today.getMonth() + 1) + '_' + today.getDate();
        }
    } else {
        if (today.getDate() < 10) {
            date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_0' + today.getDate();
        } else {
            date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
        }
    }
    console.log(date);

    const queryText = `SELECT * FROM "orders"
                        WHERE "date" = $1
                        ;`;
    pool.query(queryText, [date])
        .then((result) => {
            console.log(`GET Ratings database request successful`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
}); // END GET ROUTE

//PUT ROUTE to save current meals from the day to orders table
router.put('/save-day/', rejectNotAdmin, (req, res) => {
    

    const queryText = `WITH select_json AS (
                            SELECT  
                                JSON_AGG(
                                    JSON_BUILD_OBJECT('id', d.id, 'first_name', d.first_name, 'last_name', d.last_name, 'building_address1', d.building_address1, 'building_address2', d.building_address2, 'number_of_meals', m.number_of_meals, 'meal_choice', m.meal_choice)
                                ) AS "json_arry" 
                            FROM dependents d
                            JOIN current_meal m ON d.id = m.dependent_id)
                            INSERT INTO "orders"("date", "daily_orders")
                            SELECT current_timestamp, select_json.json_arry
                            FROM select_json
                            ;`;

    
    console.log('put request:,', queryText)
    pool.query(queryText)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //END PUT ROUTE

//PUT ROUTE to save adust data in a day
router.put('/edit/', rejectNotAdmin, (req, res) => {

    const daily_orders = req.body.daily_orders;
    const date = req.body.date;

    const queryText = `UPDATE "orders" SET "daily_orders" = $1
                        WHERE date = $2;
                            ;`;


    console.log('put request:,', queryText)
    pool.query(queryText, [daily_orders, date])
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //END PUT ROUTE


module.exports = router;