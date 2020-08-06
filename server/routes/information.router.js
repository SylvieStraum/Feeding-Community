const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotDriver } = require('../modules/driver-authentication-middleware');
const encryptLib = require('../modules/encryption');


router.get('/counties', rejectNotDriver,(req, res) => {
    sqlText=`
    SELECT *
    FROM county
    `
    pool.query(sqlText)
    .then(result=>{
        console.log('in dependent get information')
        res.send(result.rows)
    })
    .catch(err=>{
        console.log('error in dependent get', err)
        res.sendStatus(500)
    })
});

router.get('/org', rejectNotDriver,(req, res) => {
    sqlText=`
    SELECT *
    FROM referral
    `
    pool.query(sqlText)
    .then(result=>{
        console.log('in dependent get information')
        res.send(result.rows)
    })
    .catch(err=>{
        console.log('error in dependent get', err)
        res.sendStatus(500)
    })
});

router.get('/program', rejectNotDriver,(req, res) => {
    sqlText=`
    SELECT *
    FROM program
    `
    pool.query(sqlText)
    .then(result=>{
        console.log('in dependent get information')
        res.send(result.rows)
    })
    .catch(err=>{
        console.log('error in dependent get', err)
        res.sendStatus(500)
    })
});

module.exports = router;
