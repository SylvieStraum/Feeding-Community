import axios from 'axios';
import { put , takeEvery } from 'redux-saga/effects';

// GET to retrieve all account info
function* userGet() {
    try {
        const responsePayload = yield axios.get(`/api/admin/`);
        yield put({
            type: 'SET_USERS',
            payload: responsePayload
        });
    } catch (error) {
        console.log('Get user saga error', error);
    }
}

// POST for adding new Admin
function* newAdmin(action) {
    console.log('action.payload', action.payload)
    try {
        yield axios.post(`/api/admin/register/`, action.payload);
        yield put({
            type: 'GET_USERS'
        });
    } catch (error) {
        console.log('Post new dependent error', error);
    }
}

// PUT request to alter user information
function* alterAdmin(action) {
    console.log(action.payload)
    try {
        yield axios.put(`/api/admin/${action.payload.id}`, action.payload);
        yield put({
            type: 'GET_USERS'
        });
    } catch (error) {
        console.log('put saga request failed', error);
    }
}

// DELETE for removing user accounts
function* deleteAdmin(action) {
    console.log(action.payload)
    try {
        yield axios.delete(`/api/admin/${action.payload.id}`);
        yield put({
            type: 'GET_USERS'
        });
    } catch (error) {
        console.log('delete saga request failed', error);
    }
}


function* adminSaga() {
    yield takeEvery('GET_USERS', userGet)
    yield takeEvery('POST_NEW_ADMIN', newAdmin)
    yield takeEvery('UPDATE_ADMIN', alterAdmin)
    yield takeEvery('DELETE_ADMIN', deleteAdmin)
}

export default adminSaga;