const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');

// GET ROUTE to get all orders
router.get('/', rejectNotAdmin, (req, res) => {

    const queryText = `SELECT * FROM "orders"
                        ORDER BY "date" ASC;`;
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

// GET ROUTE to get specifc days
// router.get('/dates/', rejectNotAdmin, (req, res) => {

//     let date = `%${req.body.date}%`

//     console.log(date);

//     const queryText = `SELECT * FROM "orders"
//                         WHERE "date"::text LIKE $1
//                         ;`;
//     pool.query(queryText, [date])
//         .then((result) => {
//             console.log(`GET Ratings database request successful`, result);
//             res.send(result.rows);
//         })
//         .catch((error) => {
//             console.log(`Error making GET Request:`, error);
//             res.sendStatus(500);
//         });
// }); // END GET ROUTE

// GET ROUTE to get specifc days 2
router.get('/dates/', rejectNotAdmin, (req, res) => {

    console.log('query:' , req.query)
    console.log('startDate:' , req.query.startDate)
    console.log('endDate:' , req.query.endDate)

    function getDates(startDate, endDate) {

        //creates array for dates to be pushed into
        let dateArray = new Array();

        // sets current date to date type
        let currentDate = new Date(startDate);

        // sets stop date to date type
        let stopDate = new Date(endDate);

        // while loop to extract dates
        while (currentDate <= stopDate) {
            // sets current Date to date for shorter writting within loop
            let date = currentDate

            // if else to check whether month and day return would be single digit
            // if single digit adds '0' before to keep naming convention
            if (date.getMonth() < 10) {
                if (date.getDate() < 10) {
                    date = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-0' + date.getDate();
                } else {
                    date = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
                }
            } else {
                if (today.getDate() < 10) {
                    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-0' + date.getDate();
                } else {
                    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                }
            }

            // pushes date into date array
            dateArray.push(date);
            currentDate.setDate(currentDate.getDate()+1);

        }
        return dateArray;
    }
    let dates = getDates(req.query.startDate, req.query.endDate);
    console.log('dates', dates);
    let queryText = 
    function queryDefine (input){
        let whereLength = input.length
        console.log('whereLength:', whereLength);
    }
    queryDefine(dates);
    res.sendStatus(200);
    // const queryText = `SELECT * FROM "orders"
    //                     WHERE "date"::text LIKE $1
    //                     ;`;
    // pool.query(queryText, [date])
    //     .then((result) => {
    //         console.log(`GET Ratings database request successful`, result);
    //         res.send(result.rows);
    //     })
    //     .catch((error) => {
    //         console.log(`Error making GET Request:`, error);
    //         res.sendStatus(500);
    //     });
}); // END GET ROUTE

//POST ROUTE to save current meals from the day to orders table
router.post('/save-day/', rejectNotAdmin, (req, res) => {
    

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
}); //END POST ROUTE

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