const orders = (state=[], action) =>{
    //console.log('in set todays', action.type, action.payload)
    switch (action.type) {
        case 'SET_TODAYS_ORDERS':
            let orders = action.payload.data;

            let totalOrders = [];
            let meat = 0;
            let fish = 0;
            let veggie = 0;
            let special = 0;
            let total = 0;
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
            totalOrders.push({meat: meat},{fish: fish},{veggie: veggie},{special: special},{total: total})
            return [totalOrders, orders];
        default:
            return state;
    };
}

export default  orders;