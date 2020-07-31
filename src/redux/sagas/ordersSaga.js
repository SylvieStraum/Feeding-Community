import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//retrieves todays orders
function* getTodaysOrders() {
    try {
        const responsePayload = yield axios.get(`/api/orders/today/`);
        yield put({ type: 'SET_ORDERS' , payload: responsePayload});
    } catch (error) {
        console.log('Get orders saga error', error);
    }
}

//retrieves todays orders
function* getDatesOrders(action) {
    try {
        const responsePayload = yield axios.get(`/api/orders/dates/${action.payload.id}`);
        yield put({
            type: 'SET_ORDERS',
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
    yield takeEvery('GET_DATE_RANGE_ORDERS', getDatesOrders);
    yield takeEvery('UPDATE_TODAYS_ORDERS', alterOrders);
}

export default menuSaga;