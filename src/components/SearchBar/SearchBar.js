import React,{Component} from 'react';

class SearchBar extends Component(){
    state={
        firstName:''
    }
    sortDependents = () => {
        let firstName = this.state.firstName
     const result = this.props.dependents.filter(item => item.first_name.toUpperCase().includes(firstName.toUpperCase()));
        if (result.length === 0) {
          //use modal to say nothing is there?
        } else {
        //use function here to bring altered array to map in parent component  
        }
        this.setState({
          query: ''
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
  <div>
   <input 
   type="text"
   placeholder="Enter search query here"
   value={this.state.query}
   onChange={(event) => this.handleOnChange(event, 'query')}
   />
   <button onClick={()=>this.sortDependents}>search!</button>
  </div>
);
}}
export default SearchBar;
