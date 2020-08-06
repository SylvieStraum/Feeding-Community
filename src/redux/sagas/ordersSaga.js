import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//retrieves todays orders
function* getTodaysOrders() {
    try {
        const responsePayload = yield axios.get(`/api/orders/today/`);
        // sets responsePayload as orders
        console.log('responsePayload:', responsePayload)
        let orders = responsePayload.data;
        console.log('orders:', orders);
        // create variables for totalOrders array
        let meat = 0;
        let fish = 0;
        let veggie = 0;
        let special = 0;
        let total = 0;

        // for loop that counts numbers for each meal type
        for (let i = 0; i < orders.length; i++) {
            const el = orders[i];
            if (el.meal_choice === 1) {
                meat = meat + el.number_of_meals
            } else if (el.meal_choice === 2) {
                fish = fish + el.number_of_meals
            } else if (el.meal_choice === 3) {
                veggie = veggie + el.number_of_meals
            } else if (el.meal_choice === 4) {
                special = special + el.number_of_meals
            }
            total = total + el.number_of_meals
        }

        // totals for each into totalsOrders
        let totalOrders = {
            meat: meat,
            fish: fish,
            veggie: veggie,
            special: special,
            total: total
        }
        let payload = {totalOrders: totalOrders, orders: orders}
        console.log('payload:', payload)
        
        yield put({ type: 'SET_TODAYS_ORDERS' , payload: {totalOrders: totalOrders, orders: orders }});
    } catch (error) {
        console.log('Get orders saga error', error);
    }
}

//retrieves orders for dates
function* getOrders(action) {
    try {
        const method = action.payload.method;
        const value = action.payload.value;
        const range = action.payload.range;
        let responsePayload = '';
        if (method === "selectDay") {

            responsePayload = yield axios.get(`/api/orders/day/${value}`);
        } else if (method === "selectMonth") {

            responsePayload = yield axios.get(`/api/orders/month/${value}`);
        } else if (method === "rangeSubmit") {
            
            responsePayload = yield axios.get(`/api/orders/dates/?startDate=${range.startDate}:01:00:00&endDate=${range.endDate}:01:00:00`);
        }
        console.log('action.payload:', action.payload)
        yield put({
            type: 'SORT_ORDERS',
            payload: responsePayload
        });
    } catch (error) {
        console.log('Get orders saga error', error);
    }
}


// put request to alter orders
function* alterOrder(action) {
    console.log(action.payload)
    try {
        yield axios.put(`/api/orders/${action.payload.id}`, action.payload);
        yield put({ type: 'GET_DATES_ORDERS'});
    } catch (error) {
        console.log('put saga request failed', error);
    }
}


function* ordersGetSaga() {
    yield takeEvery('GET_TODAYS_ORDERS', getTodaysOrders);
    yield takeEvery('GET_ORDERS', getOrders);
    yield takeEvery('UPDATE_ORDER', alterOrder);
}

export default ordersGetSaga;