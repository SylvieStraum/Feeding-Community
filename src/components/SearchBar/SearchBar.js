import React,{Component} from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component(){
    state={
        firstName:'',
        referralQuery: ''
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

      sortReferrals = () => {
        let referralQuery = this.state.referralQuery
        // let  = this.state.referralQuery
        const result = this.props.dependents.filter(item => item.referral_id.includes(referralQuery))
        if (result.length === 0) {

        } else {

        }
        this.setState({
          referralQuery: ''
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
  onChange={(event) => this.handleOnChange(event, 'query')}/>
  <option value="0"></option>
  {this.props.referralQuery.map((item) => (
    <option value={item.id}>{item.referral_id}</option>
  ))}
  </>
);
}}

export default connect()(SearchBar);
