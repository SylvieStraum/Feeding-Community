import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import allDependents from './allDependentsReducer'
import counties from './countyReducer'
import organizations from './organizationReducer'
import programs from './programReducer'
import menu from './menuReducer'
import orders from './ordersReducer'


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  allDependents, // contains list of all dependants  and relevant information
  counties, //list of counties 
  organizations, // list of orgs tied to individual
  programs, //list of programs tied to individual
  menu, // menu
  orders, //orders
});

export default rootReducer;
