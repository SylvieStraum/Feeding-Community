const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');

//simple get all items from the menu
router.get('/', (req, res) => {
    sqlText=`
    SELECT *
    FROM menu
    `
    pool.query(sqlText)
    .then(result=>{
        console.log('in dependant get information')
        res.send(result.rows)
    })
    .catch(err=>{
        console.log('error in dependant get', err)
        res.sendStatus(500)
    })
});

//this plans on individual items being altered at a time. could change it to handling all changes at once if necessary.
router.put('/', (req, res) => {
    sqlText=`
    UPDATE menu
    SET description = $1
    WHERE id = $2
    `
    values=[req.body.desc, req.body.id]

    pool.query(sqlText, values)
    .then(result=>{
        console.log('in dependant get information')
        res.send(result.rows)
    })
    .catch(err=>{
        console.log('error in dependant get', err)
        res.sendStatus(500)
    })
});

//PUT ROUTE to change all menu items
router.put('/all/', rejectNotAdmin, (req, res) => {

    console.log('body:', req.body)
    const queryText = `UPDATE "menu" AS m
                            SET  "description" = c."description"
                            FROM (VALUES
                            (1, $1),(2, $2),(3, $3))
                            AS c("id", "description")
                            WHERE c."id" = m."id" ;`;

    const values = [req.body.option1, req.body.option2, req.body.veggie];
    console.log('put request, values:', values)
    pool.query(queryText, values)
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //END PUT ROUTE


module.exports = router;