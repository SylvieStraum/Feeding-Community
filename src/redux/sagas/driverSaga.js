import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//retrieves all dependents information
function* getRouteDependents(action) {
    try {
        const responsePayload = yield axios.get(`/api/driver/${action.payload.id}`);
        yield put({ type: 'SET_ROTUE_DEPENDENTS' , payload: responsePayload});
    } catch (error) {
        console.log('Get all saga error', error);
    }
}


function* dependentSaga() {
    yield takeEvery('GET_ROUTE_DEPENDENTS', getRouteDependents);
}

export default dependentSaga;