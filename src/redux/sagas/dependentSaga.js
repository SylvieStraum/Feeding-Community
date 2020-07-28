import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//retrieves all dependents information
function* getAllDependents() {
    try {
        const responsePayload = yield axios.get(`/api/admin`);
        yield put({ type: 'SET_ALL_DEPENDENTS' , payload: responsePayload});
    } catch (error) {
        console.log('Get all saga error', error);
    }
}
//gets single dependent info 
//potentially not needed
function* getIndividual(action) {
    try {
        const responsePayload = yield axios.get(`/api/admin/${action.payload.id}`);
        yield put({ type: 'SET_SPECIFIC_DEPENDENT' , payload: responsePayload});
    } catch (error) {
        console.log('Get individual error', error);
    }
}
//Adding new Dependant
// needs proper route to be created . url up to change
function* newDependent(action) {
    try {
       yield axios.post(`/api/admin/dependant`, action.payload);

        yield put({ type: 'GET_ALL_DEPENDENTS'  });
    } catch (error) {
        console.log('Post new dependent error', error);
    }
}

// put request to alter dependent information
function* alterDependent(action) {
    console.log(action.payload)
    try {
        yield axios.put(`/api/admin/${action.payload.id}`, action.payload);
        yield put({ type: 'GET_ALL_DEPENDENTS'});
    } catch (error) {
        console.log('put saga request failed', error);
    }
}

//delete request to delete dependent from table, may not be needed.
function* deleteDependent(action) {
    console.log(action.payload)
    try {
        yield axios.delete(`/api/admin/dependent/${action.payload}`);
        yield put({ type: 'GET_ALL_DEPENDENTS'});
    } catch (error) {
        console.log('put saga request failed', error);
    }
}

function* dependentSaga() {
    yield takeEvery('GET_ALL_DEPENDENTS', getAllDependents);
    yield takeEvery('GET_SPECIFIC_DEPENDENT', getIndividual);
    yield takeEvery('POST_NEW_DEPENDENT', newDependent)
    yield takeEvery('UPDATE_DEPENDENT', alterDependent)
    yield takeEvery('DELETE_DEPENDENT', deleteDependent)
}

export default dependentSaga;