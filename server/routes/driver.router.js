router.get('/', rejectNotAdmin, (req, res) => {
    const queryText = `SELECT "dependents"."id", "first_name", "last_name", "date_of_birth", "annual_income", "phone_number", "building_address1", "building_address2", "zip_code", "county_id", "county_name", "city", "special_request", "document_signed", "dietary_restrictions", "referral_id", "program_id", "menu_description", "referral_name", "program_name", "number_of_meals", "meal_choice", "menu_description", "route_id" FROM "dependents"
                                JOIN "county" ON "dependents"."county_id" = "county"."id"
                                JOIN "referral" ON "dependents"."referral_id" = "referral"."id"
                                JOIN "program" ON "dependents"."program_id" = "program"."id"
                                JOIN "current_meal" ON "dependents"."id" = "current_meal"."dependent_id"
                                JOIN "menu" ON "current_meal"."meal_choice" = "menu"."id"
                                JOIN "route" ON "dependents"."route_id" = "route"."id"
                                ORDER BY "dependents"."id" ASC
                                ;`;
    pool.query(queryText)
        .then((result) => {
            console.log(`GET database request successful`);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error with driver GET Request:`, error);
            res.sendStatus(500);
        });
});// end get route