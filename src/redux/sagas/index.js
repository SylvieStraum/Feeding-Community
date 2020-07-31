import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import adminSaga from './adminSaga'; //saga containing server communication to alter admin related data
import dependentSaga from './dependentSaga' // saga containing server communication to alter dependent info
import infoSaga from './infoSaga' //contains misc orgs, counties, and associated programs
import menuSaga from './menuSaga' // contains menu

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    adminSaga(),
    dependentSaga(),
    infoSaga(),
    menuSaga(),
  ]);
}
