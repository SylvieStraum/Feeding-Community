const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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


module.exports = router;