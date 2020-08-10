import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Accounts.scss';
import AccountsItem from '../AccountsItem/AccountsItem';
import SearchBar from '../SearchBar/SearchBar';

class Accounts extends Component {
  // Renders the entire Accounts on the DOM
  // dispatch call GET_ALL_DEPENDENTS and UPDATE_DEPENDENT, DISABLE_DEPENDENT potentially

  state = {
    first_name: '',
    last_name: '',
    email_address: '',
    date_of_birth: '',
    annual_income: '',
    phone_number: '',
    building_address1: '',
    building_address2: '',
    zip_code: '',
    county_id: '',
    city: '',
    special_request: '',
    dietary_restrictions: '',
  }

  componentDidMount() {
    console.log('component did mount')
    //dispatch call to GET all dependents
    this.props.dispatch({ type: 'GET_ALL_DEPENDENTS' });
    this.props.dispatch({type: 'GET_COUNTIES'});
    this.props.dispatch({type: 'GET_ORGS'});
    this.props.dispatch({type: 'GET_MENU'});
    this.props.dispatch({type: 'GET_PROGRAMS'});
    this.props.dispatch({type: 'GET_ADDRESSES'});
    this.props.dispatch({type: 'GET_ROUTES'});
  }//end componentDidMount

  render() {
    return (
      <div className="Accounts">
        <h2>Accounts</h2>
        <div className="accountItems acctTable">
        <div className='search'>
          <SearchBar 
          referralQuery={this.props.reduxState.organizations} 
          dependents={this.props.reduxState.allDependents}
          programQuery={this.props.reduxState.programs} routeQuery={this.props.reduxState.driverRoutes}
          >
          </SearchBar>
          {/* <SearchAddress dependents={this.props.reduxState.allDependents}/> */}
        </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Zip Code</th>
                <th>County</th>
                <th>City</th>
                <th>Special Requests</th>
                <th>Meal Type</th>
                <th>Dietary Restrictions</th>
                <th>Referral Organization</th>
                <th>Qualified Program</th>
                <th>Signed</th>
                <th>Route Assignment</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {/* this table row and data below will eventually come from a .map of reduxState */}
              {this.props.reduxState.searchReducer.length ?
               this.props.reduxState.searchReducer.map((item) => (
                <AccountsItem key={item.id} item={item}/>
              ))
              :
              this.props.reduxState.allDependents.map((item) => (
                <AccountsItem key={item.id} item={item}/>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );//end return
  }//end render
}//end class

//will need a map reduxState for dependents
const mapReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(mapReduxStateToProps)(Accounts);