import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Accounts.css';

class Accounts extends Component {
  // Renders the entire Accounts on the DOM
  render() {
    return (
      <div className="Accounts">
        <div className="accountItems">
          <h2>ACCOUNTS</h2>
          <p>List of all accounts, you can edit within any row.</p>
        </div>
        <div className="accountItems">
        <table>
          <caption>Accounts</caption>
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
            <th>Edit</th>
          </tr>
          {/* this table row and data below will eventually come from a .map of reduxState */}
          <tr>
            {/* name td will return a concatenated string of first and last name */}
            <td>Mohamed Mohamed</td>
            <td></td>
            <td></td>
            {/* address td will be a concatenated string of building_address 1 and 2 */}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            {/* this will conditionally render all information to inputs */}
            <td><button>Edit</button></td>
          </tr>
          <tr>
            {/* name td will return a concatenated string of first and last name */}
            <td>Mohamed Mohamed</td>
            <td></td>
            <td></td>
            {/* address td will be a concatenated string of building_address 1 and 2 */}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            {/* this will conditionally render all information to inputs */}
            <td><button onClick={this.editIndividual}>Edit</button></td>
          </tr>
        </table>
        </div>
      </div>
    );//end return
  }//end render
}//end class

//will need a map reduxState for dependents
export default connect()(Accounts);