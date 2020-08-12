import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//retrieves all dependents information
function* getAllDependents() {
    try {
        const responsePayload = yield axios.get(`/api/dependent`);
        yield put({ type: 'SET_ALL_DEPENDENTS' , payload: responsePayload});
    } catch (error) {
        console.log('Get all saga error', error);
    }
}
//retrieves all dependents information
function* getAllDependentsSearched(action) {
    try {
        const responsePayload = yield axios.get(`/api/dependent`);
        yield put({ type: 'SET_ALL_DEPENDENTS' , payload: responsePayload});
        let result = []
        //console.log('result:', result);
        
        // yield put({ type: 'SET_ALL_DEPENDENTS' , payload: result});
    } catch (error) {
        console.log('Get all saga error', error);
    }
}
//gets single dependent info 
//potentially not needed
function* getIndividual(action) {
    try {
        const responsePayload = yield axios.get(`/api/dependent/${action.payload.id}`);
        yield put({ type: 'SET_SPECIFIC_DEPENDENT' , payload: responsePayload});
    } catch (error) {
        console.log('Get individual error', error);
    }
}
//Adding new Dependent
// needs proper route to be created . url up to change
function* newDependent(action) {
    try {
        yield axios.post(`/api/dependent`, action.payload);
        yield put({ type: 'GET_ALL_DEPENDENTS'  });
    } catch (error) {
        console.log('Post new dependent error', error);
    }
}

// put request to alter dependent information
function* alterDependent(action) {
    try {
        yield axios.put(`/api/dependent/${action.payload.dependent.id}`, action.payload.dependent);
        if (action.payload.searchState === true){
            yield put({ type: 'GET_ALL_DEPENDENTS_SEARCH'});
        }
        else if (action.payload.searchState === false){
            yield put({ type: 'GET_ALL_DEPENDENTS'});
        }
    } catch (error) {
        console.log('put saga request failed', error);
    }
}

//delete request to delete dependent from table, may not be needed.
function* deleteDependent(action) {
    try {
        yield axios.delete(`/api/dependent/${action.payload}`);
        yield put({ type: 'GET_ALL_DEPENDENTS'});
    } catch (error) {
        console.log('put saga request failed', error);
    }
}

function* dependentSaga() {
    yield takeEvery('GET_ALL_DEPENDENTS', getAllDependents);
    yield takeEvery('GET_ALL_DEPENDENTS_SEARCH', getAllDependentsSearched);
    yield takeEvery('GET_SPECIFIC_DEPENDENT', getIndividual);
    yield takeEvery('POST_NEW_DEPENDENT', newDependent)
    yield takeEvery('UPDATE_DEPENDENT', alterDependent)
    yield takeEvery('DELETE_DEPENDENT', deleteDependent)
}

export default dependentSaga;