import React,{Component} from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component{
    state={
        firstName:'',
        lastName:'',
        referralQuery: '',
        programQuery: ''
    }
    sortByName = () => {
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let result = this.props.dependents
       this.state.firstName ?
       result = result.filter(item => item.first_name.toUpperCase().includes(firstName.toUpperCase()))
       :
       console.log('no firstname query')
       this.state.lastName ? 
       result = result.filter(item => item.last_name.toUpperCase().includes(lastName.toUpperCase())) 
       : 
       console.log('no lastname found query')
     if (result.length === 0) {
          //use modal to say nothing is there?
          console.log('not found here is list', this.props.dependents)
          return false
        } else {
        //use function here to bring altered array to map in parent component  
        console.log('found people containing phrase, heres that list',result)
        return true
        }
      }

      sortReferrals = (event) => {
        let referralQuery = event.target.value
        // let  = this.state.referralQuery
        const result = this.props.dependents.filter(item => item.referral_name.includes(referralQuery))
        if (result.length === 0) {

        } else {

          
        }
        this.setState({
          referralQuery: referralQuery
        })
      }

      sortPrograms = (event) => {
        let programQuery = event.target.value
        const result = this.props.dependents.filter(item => item.program_name.includes(programQuery))
        if (result.length === 0) {

        } else {

        }
        this.setState({
          programQuery: programQuery
        })
      }


      handleOnChange = (event, type) => {
        this.setState({
          ...this.state,
          [type]: event.target.value
        })
      }


render(){
console.log(this.props)
    return(
      <>
  <div className="searchBar">
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
   <button onClick={()=>this.sortByName()}>search!</button>
  </div>
  <select 
  type="dropdown"
  value={this.state.referralQuery}
  onChange={(event) => this.sortReferrals(event)}>
  <option value="">Please select by organization</option>
  {this.props.referralQuery.map((item) => (
    <option value={item.id}>{item.referral_name}</option>
  ))}
  </select>
  <select 
  type="dropdown"
  value={this.state.programQuery}
  onChange={(event) => this.sortPrograms(event)}>
  <option value="">Please select by program</option>
  {this.props.programQuery.map((item) => (
    <option value={item.id}>{item.program_name}</option>
  ))}
  </select>
  </>
);
}}

export default connect()(SearchBar);
