import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//retrieves all dependents information
function* getCounties() {
    try {
        const responsePayload = yield axios.get(`/api/info/counties`);
        yield put({ type: 'SET_ALL_COUNTIES' , payload: responsePayload});
    } catch (error) {
        console.log('Get all saga error', error);
    }
}

function* getOrgs() {
    try {
        const responsePayload = yield axios.get(`/api/info/org`);
        yield put({ type: 'SET_ALL_ORGS' , payload: responsePayload});
    } catch (error) {
        console.log('Get all saga error', error);
    }
}

function* getPrograms() {
    try {
        const responsePayload = yield axios.get(`/api/info/program`);
        yield put({ type: 'SET_ALL_PROGRAMS' , payload: responsePayload});
    } catch (error) {
        console.log('Get all saga error', error);
    }
}

function* infoSaga() {
 yield takeEvery('GET_COUNTIES', getCounties)
 yield takeEvery('GET_ORGS', getOrgs)
 yield takeEvery('GET_PROGRAMS', getPrograms)
}

export default infoSaga;