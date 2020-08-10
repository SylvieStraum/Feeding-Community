const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNotAdmin } = require('../modules/admin-authentication-middleware');
const encryptLib = require('../modules/encryption');

//GET ROUTE to return all accounts
router.get('/', rejectNotAdmin, (req, res) => {
        const queryText = `SELECT "user"."id" AS "id", "username", "password", "account_type", "route"."id" AS "route_id", "route_name", "user_id" FROM "user"
                            FULL JOIN "route" ON "user"."id" = "route"."user_id"
                            ORDER BY "user"."id" ASC;`;

        pool.query(queryText)
            .then((result) => {
                console.log(`GET database request successful`);
                res.send(result.rows);
            })
            .catch((error) => {
                console.log(`Error making GET Request:`, error);
                res.sendStatus(500);
            });
})

//POST ROUTE to create new Admin account
router.post('/register/', rejectNotAdmin, (req, res) => {

    const password = encryptLib.encryptPassword(req.body.password);
    const username = req.body.username;
    const account_type = req.body.account_type;

    console.log("password:", password, "username:", username, "account_type:" , account_type);

    const queryText = `INSERT INTO "user"
                            ("username", "password", "account_type")
                            VALUES
                            ($1, $2, $3)                  
                            ;`;
    let values = [username, password, account_type];

    pool.query(queryText, values)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});//END POST ROUTE to create account

//PUT ROUTE to change all menu items
router.put('/:id', rejectNotAdmin, async (req, res) => {

    let actionType = req.body.actionType
    let queryText = ``;
    let values = [];
    let id = req.params.id;
    let password = '';
    let username = '';
    let account_type = '';
    let route_id = 0;
    console.log('body:', req.body, 'id:', id)
    if (actionType === 'editPassword') {
        password = encryptLib.encryptPassword(req.body.password);
        queryText = `UPDATE "user"
                        SET "password" = $1
                        WHERE "id" = $2;`
        values = [password, id];
    }
    else if (actionType === 'editUsername') {
        username = req.body.username;
        queryText = `UPDATE "user"
                        SET "username" = $1
                        WHERE "id" = $2;`
        values = [username, id];
    }
    else if (actionType === 'editAccountType') {
        account_type = req.body.account_type
        queryText = `UPDATE "user"
                        SET "account_type" = $1
                        WHERE "id" = $2;`
        values = [account_type, id];
    }
    else if (actionType === 'editRoute') {
        account_type = req.body.account_type
        route_id = req.body.route_id
        queryText = `UPDATE "route"
                        SET "user_id" = $1
                        WHERE "id" = $2;`
        values = [id, route_id];
    }
    if (actionType === 'editRoute'){
        const connection = await pool.connect();
        try {
            await connection.query('BEGIN;');
            const selectSQL = `SELECT "id" FROM "route"
                                WHERE "user_id" = $1;`
            
            const deleteSQL = `UPDATE "route"
                                    SET "user_id" = null
	                                WHERE "id" = $1;`;
            const toRemove = await connection.query(selectSQL, [id]);
            if (toRemove.rows[0] !== undefined) {
                await connection.query(deleteSQL, [toRemove.rows[0].id]);
            }
            await connection.query(queryText, values);
            await connection.query('COMMIT;');
            res.sendStatus(200);
        } catch (error) {
            await connection.query('ROLLBACK;');
            console.log('Error with updating dependent info', error)
            res.sendStatus(500);
        } finally {
            connection.release();
        }
    }   
    else {
        console.log('put request, values:', values)
        pool.query(queryText, values)
            .then((results) => {
                res.send("Update user successful");
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            })
    }

}); //END PUT ROUTE

// DELETE Route
router.delete('/:id', rejectNotAdmin, (req, res) => {
    
    let id = req.params.id; // id of the thing to delete
    console.log('Delete route called with id of', id);
    
    let queryText = ` DELETE FROM "user"
                        WHERE id = $1;`;

    pool.query(queryText, [id])
        .then((result) => {
            console.log(`User ${id} has been deleted`);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Delete has failed.', err);
            res.sendStatus(500);
        });

}); // END DELETE Route



module.exports = router;