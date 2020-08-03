import React,{Component} from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {
    state={
        firstName:'',
        referralQuery: '',
        programQuery: ''
    }
    sortDependents = () => {
        let firstName = this.state.firstName
      let result = this.props.dependents.filter(item => item.first_name.toUpperCase().includes(firstName.toUpperCase()));
        if (result.length === 0) {
          //use modal to say nothing is there?
        } else {
        //use function here to bring altered array to map in parent component  
        }
        this.setState({
          query: ''
        })
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
    return(
      <>
  <div>
   <input 
   type="text"
   placeholder="Enter search query here"
   value={this.state.query}
   onChange={(event) => this.handleOnChange(event, 'query')}
   />
   <button onClick={()=>this.sortDependents}>search!</button>
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
