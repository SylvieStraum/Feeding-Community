const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotEditor } = require('../modules/editor-authentication-middleware');
const { rejectNotOvernight } = require('../modules/overnight-authentication-middleware');
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');
const { query } = require('../modules/pool');

// GET ROUTE to get all orders
router.get('/', rejectNotEditor, (req, res) => {

    const queryText = `SELECT * FROM "orders"
                        ORDER BY "date" ASC;`;
    pool.query(queryText)
        .then((result) => {
            console.log(`GET database request successful`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
}); // END GET ROUTE


// GET ROUTE to get total of today's orders
router.get('/today/', rejectNotEditor, (req, res) => {

    let today = new Date();
    let date = '';
    console.log('today:', today)
    if (today.getMonth() < 10) {
        if (today.getDate() < 10) {
            date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
        } else {
            date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
        }
    } else {
        if (today.getDate() < 10) {
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate();
        } else {
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        }
    }
    console.log('date:' , date);

    const queryText = `SELECT * FROM "orders"
                        WHERE "date" = $1
                        ;`;
    pool.query(queryText, [date])
        .then((result) => {
            console.log(`GET database request successful`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
}); // END GET ROUTE

// GET ROUTE to get a day's orders
router.get('/day/:id', rejectNotEditor, (req, res) => {

    let date = req.params.id
    console.log('date:' , date);

    const queryText = `SELECT "orders"."id" AS "id", "date", "dependent_id", "number_of_meals", "meal_choice", "first_name", "last_name", "building_address1", "building_address2" FROM "orders"
                        JOIN "dependents" ON "orders"."dependent_id" = "dependents"."id"
                        WHERE "date" = $1
                        ;`;
    pool.query(queryText, [date])
        .then((result) => {
            console.log(`GET database request successful`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
}); // END GET ROUTE

// GET ROUTE to get a month's worth of dates
router.get('/month/:id', rejectNotEditor, (req, res) => {

    let date = `%${req.params.id}%`

    console.log(date);

    const queryText = `SELECT "orders"."id" AS "id", "date", "dependent_id", "number_of_meals", "meal_choice", "first_name", "last_name", "building_address1", "building_address2" FROM "orders"
                        JOIN "dependents" ON "orders"."dependent_id" = "dependents"."id"
                        WHERE "date"::text LIKE $1
                        ;`;
    pool.query(queryText, [date])
        .then((result) => {
            console.log(`GET database request successful`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
}); // END GET ROUTE

// GET ROUTE to get a year's worth of dates
router.get('/year/', rejectNotEditor, (req, res) => {

    let date = `%${req.body.date}%`

    console.log(date);

    const queryText = `SELECT "orders"."id" AS "id", "date", "dependent_id", "number_of_meals", "meal_choice", "first_name", "last_name", "building_address1", "building_address2" FROM "orders"
                        JOIN "dependents" ON "orders"."dependent_id" = "dependents"."id"
                        WHERE "date"::text LIKE $1
                        ;`;
    pool.query(queryText, [date])
        .then((result) => {
            console.log(`GET database request successful`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
}); // END GET ROUTE

// GET ROUTE to get specifc range
router.get('/dates/', rejectNotEditor, (req, res) => {

    // console.log('query:' , req.query)
    // console.log('startDate:' , req.query.startDate)
    // console.log('endDate:' , req.query.endDate)

    // function to get list of dates from input range
    function getDates(startDate, endDate) {

        //creates array for dates to be pushed into
        let dateArray = new Array();

        // sets current date to date type
        let currentDate = new Date(startDate);
        // console.log('currentDate:', currentDate);

        // sets stop date to date type
        let stopDate = new Date(endDate);
        // console.log('stopDate:', stopDate);

        // while loop to extract dates
        while (currentDate <= stopDate) {
            // sets current Date to date for shorter writting within loop
            let date = currentDate
            // console.log('date:', date);
            // if else to check whether month and day return would be single digit
            // if single digit adds '0' before to keep naming convention
            if (date.getMonth() < 10) {
                if (date.getDate() < 10) {
                    date = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-0' + date.getDate();
                    // console.log('in if, date:', date);
                } else {
                    date = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
                    // console.log('in if, date:', date);
                }
            } else {
                if (date.getDate() < 10) {
                    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-0' + date.getDate();
                    // console.log('in if, date:', date);
                } else {
                    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                    // console.log('in if, date:', date);
                }
            }

            // pushes date into date array
            dateArray.push(date);
            currentDate.setDate(currentDate.getDate()+1);

        }
        return dateArray;
    }
    
    // runs getDates function and sets dates to dates variable
    let dates = getDates(req.query.startDate, req.query.endDate);
    console.log('dates', dates);
    
    // sets initial part of query text
    let queryText = `SELECT "orders"."id" AS "id", "date", "dependent_id", "number_of_meals", "meal_choice", "first_name", "last_name", "building_address1", "building_address2" FROM "orders"
                        JOIN "dependents" ON "orders"."dependent_id" = "dependents"."id"
                        WHERE `

    // function to add additional text to query for each date in array
    function queryDefine (input){
        // let whereLength = input.length
        // console.log('whereLength:', whereLength);
        
        // this 'for' loop adds additional text to the query based for each date in the dates array
        // starts index at 1  instead of 0 and ends at input length instead of before input length, just to shorten some code
        for (let index = 1; index <= input.length; index++) {
            // if single date adds only this to query text
            if (input.length === 1) {
                queryText = queryText.concat(` "date" = ${'$' + index} ORDER BY "date" ASC;`)
            }
            // query text added for first index
            else if(index === 1){
                queryText = queryText.concat(` "date" = ${'$' + index}`)
            }
            // query text added for last input if more than a single date requested
            else if(index === input.length){
                queryText = queryText.concat(` OR "date" = ${'$' + index} ORDER BY "dependent_id" ASC, "date" ASC;`)
            }
            // query text added for any input that isn't first or last for more than a single date
            else{
                queryText = queryText.concat(` OR "date" = ${'$' + index}`)
            }
        }
    }
    // runs function queryDefine
    queryDefine(dates);
    console.log(queryText);

    pool.query(queryText, dates)
        .then((result) => {
            console.log(`GET database request successful`, result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making GET Request:`, error);
            res.sendStatus(500);
        });
}); // END GET ROUTE

//POST ROUTE to save current meals from the day to orders table
router.post('/save-day/', rejectNotOvernight, (req, res) => {
    

    const queryText = `INSERT INTO "orders" ("date", "dependent_id", "number_of_meals", "meal_choice")
                        SELECT current_timestamp, "dependent_id", "number_of_meals", "meal_choice" FROM "current_meal"
                        ORDER BY "dependent_id" ASC
                        ;`;

    
    console.log('put request:,', queryText)
    pool.query(queryText)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //END POST ROUTE

//POST ROUTE to save current meals from the day to orders table
router.post('/save-day-back-up/', rejectNotAdmin, (req, res) => {


    const queryText = `INSERT INTO "orders" ("date", "dependent_id", "number_of_meals", "meal_choice")
                        SELECT current_timestamp, "dependent_id", "number_of_meals", "meal_choice" FROM "current_meal"
                        ORDER BY "dependent_id" ASC
                        ;`;


    console.log('put request:,', queryText)
    pool.query(queryText)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //END POST ROUTE

//PUT ROUTE to save adjust data in a day
router.put('/edit/', rejectNotEditor, (req, res) => {

    

    const queryText = `UPDATE "orders" SET "daily_orders" = $1
                        WHERE date = $2 AND dependet_id = $3;
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