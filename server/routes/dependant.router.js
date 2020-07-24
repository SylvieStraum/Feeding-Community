const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get request where it gets user specific information.
router.get('/', (req, res) => {
    sqlText=`
    SELECT *
    FROM dependant
    WHERE user_id = $1`
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

//this put plans on a modular approach to editing profile information. 
//send up the key/value pair with key as column to target and value as new value for the update
router.put('/', (req, res) => {
sqlText=`
UPDATE dependant
SET $1 =$2
WHERE id = $3
`
values=[req.body.key, req.body.value, req.user.id]
pool.query(sqlText,values)
.then(result=>{
    console.log('success with PUT')
    res.sendStatus(200)
})
.catch(err=>{
    console.log('error in dependant PUT', err)
    res.sendStatus(500)
})
});

module.exports = router;