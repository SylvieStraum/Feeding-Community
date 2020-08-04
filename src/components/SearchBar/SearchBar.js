import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {
  state = {
    address: '',
    firstName: '',
    lastName: '',
    referralQuery: '',
    programQuery: ''
  }

  resetDependents = () => {
    this.props.dispatch({ type: 'GET_ALL_DEPENDENTS' });
  }

  searchDependents = (event) => {
    let firstName = this.state.firstName
    let lastName = this.state.lastName
    let address = this.state.address
    let result = this.props.dependents
    let referralQuery = this.state.referralQuery
    let programQuery = this.state.programQuery

    this.state.firstName ?
      result = result.filter(item => item.first_name.toUpperCase().includes(firstName.toUpperCase()))
      :
      console.log('no firstname query')
    this.state.lastName ?
      result = result.filter(item => item.last_name.toUpperCase().includes(lastName.toUpperCase()))
      :
      console.log('no lastname found query')
    this.state.address ?
      result = result.filter(item => item.building_address1.toUpperCase().includes(address.toUpperCase()))
      :
      console.log('no address found', referralQuery)
    this.state.referralQuery ?
      result = result.filter(item => item.referral_id === Number(referralQuery))
      :
      console.log('no one in that referral organization')

    this.state.programQuery ?
      result = result.filter(item => item.program_id === Number(programQuery))
      :
      console.log('no one in that program found')
    if (result.length === 0) {
      //use modal to say nothing is there?
      console.log('not found here is list', this.props.dependents)
    } else if (result.length != 0) {
      //use function here to bring altered array to map in parent component  
      console.log('found people containing phrase, heres that list', result)
    }

    //dispatch call to bring back array with only search inputs
    this.props.dispatch({ type: 'SEARCH_DEPENDENTS', payload: result});
  }

  handleOnChange = (event, type) => {
    this.setState({
      ...this.state,
      [type]: event.target.value
    })
  }


  render() {
    console.log("props", this.props)
    return (
      <>
        <div className="searchItems">
          <input
            type="text"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={(event) => this.handleOnChange(event, 'firstName')}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={(event) => this.handleOnChange(event, 'lastName')}
          />
          <input
            type="text"
            placeholder="Address"
            value={this.state.address}
            onChange={(event) => this.handleOnChange(event, 'address')}
          />
          <button onClick={() => this.searchDependents()}>search!</button>
          <button onClick={this.resetDependents}>reset</button>
        </div>
        <div className="searchItems">
          <select
            type="dropdown"
            value={this.state.referralQuery}
            onChange={(event) => this.handleOnChange(event, 'referralQuery')}>
            <option value="">Please select by organization</option>
            {this.props.referralQuery.map((item) => (
              <option value={item.id}>{item.referral_name}</option>
            ))}
          </select>
          <select
            type="dropdown"
            value={this.state.programQuery}
            onChange={(event) => this.handleOnChange(event, 'programQuery')}>
            <option value="">Please select by program</option>
            {this.props.programQuery.map((item) => (
              <option value={item.id}>{item.program_name}</option>
            ))}
          </select>
        </div>
      </>
    );
  }
}

export default connect()(SearchBar);
