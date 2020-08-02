import React,{Component} from 'react';

class SearchBar extends Component{
    state={
        firstName:'',
        lastName:''
    }
    sortByName = () => {
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let result = this.props.dependents
       this.state.firstName && result.filter(item => item.first_name.toUpperCase().includes(firstName.toUpperCase()));
       this.state.lastName && result.filter(item => item.last_name.toUpperCase().includes(lastName.toUpperCase()));
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
      handleOnChange = (event, type) => {
        this.setState({
          ...this.state,
          [type]: event.target.value
        })
      }
render(){
    return(
  <div>
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
);
}}
export default SearchBar;
