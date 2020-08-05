import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//retrieves todays orders
function* getTodaysOrders() {
    try {
        const responsePayload = yield axios.get(`/api/orders/today/`);
        yield put({ type: 'SET_TODAYS_ORDERS' , payload: responsePayload});
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
            type: 'SET_RANGE_ORDERS',
            payload: responsePayload
        });
    } catch (error) {
        console.log('Get orders saga error', error);
    }
}


// put request to alter orders
function* alterOrders(action) {
    console.log(action.payload)
    try {
        yield axios.put(`/api/orders/${action.payload.id}`, action.payload);
        yield put({ type: 'GET_DATES_ORDERS'});
    } catch (error) {
        console.log('put saga request failed', error);
    }
}


function* menuSaga() {
    yield takeEvery('GET_TODAYS_ORDERS', getTodaysOrders);
    yield takeEvery('GET_ORDERS', getOrders);
    yield takeEvery('UPDATE_TODAYS_ORDERS', alterOrders);
}

export default menuSaga;