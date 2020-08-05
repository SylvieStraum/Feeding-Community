import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* driverSaga() {
    yield takeEvery('GET_DRIVER_DEPENDENTS', getDriverDependents);
}

//gets information for driver dependents
function* getDriverDependents() {
    try {
        const responsePayload = yield axios.get(`/api/driver`);
        console.log(responsePayload)
        yield put({ type: 'SET_DRIVER_DEPENDENTS' , payload: responsePayload});
    } catch (error) {
        console.log('error with GET driver saga', error);
    }
}

export default driverSaga;