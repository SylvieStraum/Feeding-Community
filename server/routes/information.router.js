const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');
const encryptLib = require('../modules/encryption');


router.get('/counties', rejectNotAdmin,(req, res) => {
    sqlText=`
    SELECT *
    FROM county
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

router.get('/org', rejectNotAdmin,(req, res) => {
    sqlText=`
    SELECT *
    FROM referral
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

router.get('/program', rejectNotAdmin,(req, res) => {
    sqlText=`
    SELECT *
    FROM program
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

module.exports = router;
