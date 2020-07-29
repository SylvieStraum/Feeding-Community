const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');
const encryptLib = require('../modules/encryption');

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
router.get('/total/today/', rejectNotAdmin, (req, res) => {

    let today = new Date();
    let date = '';
    if (today.getMonth() < 10){
        if (today.getDate()< 10) {
            date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate() + '-' + 'orders';
        }
        else{
            date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + 'orders';
        }
    }
    else{
       if (today.getDate() < 10) {
           date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate() + '-' + 'orders';
       } else {
           date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + 'orders';
       }
    }
    console.log(date);

    const queryText = `SELECT SUM("${date}") AS total FROM "orders";`;
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

//PUT ROUTE to save current meals from the day to orders table
router.put('/save-day/', rejectNotAdmin, (req, res) => {
    
    let values = [];
    if(req.body.columnName){
    columnName = req.body.columnName
    values = [columnName, columnName];
    } 
    else{
    let today = new Date();
    let date = '';
    if (today.getMonth() < 10) {
        if (today.getDate() < 10) {
            date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate() + '-' + 'orders';
        } else {
            date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + 'orders';
        }
    } else {
        if (today.getDate() < 10) {
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate() + '-' + 'orders';
        } else {
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + 'orders';
        }
    }
    values = [date, date];
    }

    console.log('column:', columnName);

    const queryText = `BEGIN;
                       ALTER TABLE orders ADD COLUMN $1 INT;
                       UPDATE "orders"
                       SET $2 = "current_meal"."number_of_meals"
                       FROM "current_meal" WHERE orders.dependent_id = current_meal.dependent_id;
                       COMMIT;`;

    
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