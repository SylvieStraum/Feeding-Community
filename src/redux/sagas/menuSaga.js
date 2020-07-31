import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//retrieves all menu
function* getMenu() {
    try {
        const responsePayload = yield axios.get(`/api/menu`);
        yield put({ type: 'SET_MENU' , payload: responsePayload});
    } catch (error) {
        console.log('Get menu saga error', error);
    }
}

// put request to alter menu
function* alterMenu(action) {
    console.log(action.payload)
    try {
        yield axios.put(`/api/menu/${action.payload.id}`, action.payload);
        yield put({ type: 'GET_MENU'});
    } catch (error) {
        console.log('put saga request failed', error);
    }
}


function* menuSaga() {
    yield takeEvery('GET_MENU', getMenu);
    yield takeEvery('UPDATE_MENU', alterMenu)
}

export default menuSaga;