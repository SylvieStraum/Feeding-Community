const orders = (state=[], action) =>{
    //console.log('in set todays', action.type, action.payload)
    switch (action.type) {
        case 'SET_TODAYS_ORDERS':
            // sets action.payload.data as orders
            let orders = action.payload.data;
            
            // create variables for totalOrders array
            let totalOrders = [];
            let meat = 0;
            let fish = 0;
            let veggie = 0;
            let special = 0;
            let total = 0;

            // for loop that counts numbers for each meal type
            for (let i = 0; i < orders.length; i++) {
                const el = orders[i];
                if(el.meal_choice === 1){
                    meat++
                }
                else if (el.meal_choice === 2) {
                    fish++
                }
                else if (el.meal_choice === 3) {
                    veggie++
                }
                else if (el.meal_choice === 4) {
                    special++
                }
                total++
            }

            // pushes totals for each into totalsOrders array
            totalOrders.push({meat: meat},{fish: fish},{veggie: veggie},{special: special},{total: total})
            
            // returns totals array then orders array
            return [totalOrders, orders];
        default:
            return state;
    };
}

export default  orders;