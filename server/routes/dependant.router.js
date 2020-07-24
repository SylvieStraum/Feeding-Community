const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    sqlText=`
    SELECT *
    FROM []
    WHERE "user".id = $1`
    pool.query(sqlText, [req.user.id])
    .then(result=>{
        console.log('in dependant get information')
        res.send(result.rows)
    })
    .catch(err=>{
        console.log('error in dependant get', err)
        res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
sqlText=``
values=[]
pool.query(sqlText,values)
.then(result=>{
    console.log('success with POST')
    res.sendStatus(200)
})
.catch(err=>{
    console.log('error in dependant POST', err)
    res.sendStatus(500)
})
});

module.exports = router;