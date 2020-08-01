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

//retrieves a specific month's orders
function* getMonthOrders() {
    try {
        const responsePayload = yield axios.get(`/api/orders/month/${action.payload.id}`);
        yield put({
            type: 'SET_ORDERS',
            payload: responsePayload
        });
    } catch (error) {
        console.log('Get orders saga error', error);
    }
}

//retrieves a specific years's orders
function* getYearOrders() {
    try {
        const responsePayload = yield axios.get(`/api/orders/year/${action.payload.id}`);
        yield put({
            type: 'SET_ORDERS',
            payload: responsePayload
        });
    } catch (error) {
        console.log('Get orders saga error', error);
    }
}

//retrieves range of orders
function* getDatesOrders(action) {
    // note for future cam/other devs to get dates action.payload.id will have to be a http params query like:
    // ?startDate=2020-07-30:01:00:00&endDate=2020-08-01:01:00:00
    // startDate determines the starting date, endDate determines ending date
    // YYYY-MM-DD:HH:MM:SS format works well with this system
    // HH:MM:SS has to be specified or it defaults to 00:00:00, which can end up with date being read as day before
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
    yield takeEvery('GET_MONTH_ORDERS', getMonthOrders);
    yield takeEvery('GET_YEAR_ORDERS', getYearOrders);
    yield takeEvery('GET_DATE_RANGE_ORDERS', getDatesOrders);
    yield takeEvery('UPDATE_TODAYS_ORDERS', alterOrders);
}

export default menuSaga;