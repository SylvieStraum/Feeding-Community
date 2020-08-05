import axios from 'axios';
import { put , takeEvery } from 'redux-saga/effects';

//retrieves todays orders
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
//Adding new Admin
function* newAdmin(action) {
    try {
       yield axios.post(`/api/admin/register/`, action.payload);

        // yield put({ type: 'GET_ALL_ADMIN'  });
        //this is if they need a list of admins, can be added later if need arrises 
    } catch (error) {
        console.log('Post new dependent error', error);
    }
}

// delete outdated admin account
function* deleteAdmin(action) {
    console.log(action.payload)
    try {
        yield axios.delete(`/api/admin/${action.payload}`);
    } catch (error) {
        console.log('put saga request failed', error);
    }
}


function* adminSaga() {
    yield takeEvery('GET_USERS', userGet)
    yield takeEvery('POST_NEW_ADMIN', newAdmin)
    yield takeEvery('DELETE_ADMIN', deleteAdmin)
}

export default adminSaga;