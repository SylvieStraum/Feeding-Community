import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import './SearchBar.scss'

class SearchBar extends Component {
  state = {
    address: '',
    firstName: '',
    lastName: '',
    referralQuery: '',
    programQuery: ''
  }

  resetDependents = () => {
    this.props.dispatch({ type: 'RESET_SEARCH' });
    this.setState({
      address: '',
      firstName: '',
      lastName: '',
      referralQuery: '',
      programQuery: ''
    })
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
      console.log('')
    this.state.lastName ?
      result = result.filter(item => item.last_name.toUpperCase().includes(lastName.toUpperCase()))
      :
      console.log('')
    this.state.address ?
      result = result.filter(item => item.building_address1.toUpperCase().includes(address.toUpperCase()))
      :
      console.log('')
    this.state.referralQuery ?
      result = result.filter(item => item.referral_id === Number(referralQuery))
      :
      console.log('')

    this.state.programQuery ?
      result = result.filter(item => item.program_id === Number(programQuery))
      :
      console.log('')
    if (result.length === 0) {
      Swal.fire({
        title: 'Sorry, no one matches that search!',
        icon: 'warning',
        width: 600,
        padding: '3em',
        background: '#fff',
        backdrop: `
          rgba(0,0,0,0.4)
          no-repeat
        `
      })
    } else {
     //dispatch call to bring back array with only search inputs
     this.props.dispatch({ type: 'SEARCH_DEPENDENTS', payload: result});
    }
  }

  handleOnChange = (event, type) => {
    this.setState({
      ...this.state,
      [type]: event.target.value
    })
  }
  
  render() {
    return (
        <div className="searchItems" >
         <h3 className="inline">Search by:</h3>
        <div className="inline inputs">   
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
          <select
            type="dropdown"
            value={this.state.referralQuery}
            onChange={(event) => this.handleOnChange(event, 'referralQuery')}>
            <option value="">Referral Org</option>
            {this.props.referralQuery.map((item) => (
              <option key={item.id} value={item.id}>{item.referral_name}</option>
            ))}
          </select>
          <select
            type="dropdown"
            value={this.state.programQuery}
            onChange={(event) => this.handleOnChange(event, 'programQuery')}>
            <option value="">Program</option>
            {this.props.programQuery.map((item) => (
              <option key={item.id} value={item.id}>{item.program_name}</option>
            ))}
          </select>
          </div>
          <div className="searchBtn inline">
          <button onClick={() => this.searchDependents()}>search</button>
          <button onClick={this.resetDependents}>reset</button>
          </div>
        </div>
    );
  }
}

export default connect()(SearchBar);
