import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class AccountsItem extends Component {
    state = {
        edit: false
    }

    // PUT request
    editDependent = () => {
        console.log('edit dependent:', this.props.item) //this will target the specific dependent clicked

    }
    // toggles to editable state
    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    // send PUT and toggles to uneditable state
    updateDependent = () => {
        console.log('update dependent', this.props.item)

        // sends dispatch with put information
        this.props.dispatch({
            type: 'UPDATE_DEPENDENT',
            payload: this.state
        });

        // toggles to uneditable state
        this.setState({
            edit: !this.state.edit
        })
    }

    // sets state on component mount
    componentDidMount(){
        this.sendToState();
    }

    // gets props data and updates state with data to allow for editing
    sendToState(){
        this.setState({
            id: this.props.item.id,
            first_name: this.props.item.first_name,
            last_name: this.props.item.last_name,
            date_of_birth: this.props.item.date_of_birth,
            annual_income: this.props.item.annual_income,
            phone_number: this.props.item.phone_number,
            building_address1: this.props.item.building_address1,
            building_address2: this.props.item.building_address2,
            meal_choice: this.props.item.meal_choice,
            zip_code: this.props.item.zip_code,
            county_id: this.props.item.county_id,
            city: this.props.item.city,
            special_request: this.props.item.special_request,
            dietary_restrictions: this.props.item.dietary_restrictions,
            referral_id: this.props.item.referral_id,
            program_id: this.props.item.program_id,
            document_signed: this.props.item.document_signed
        })
    }

    // handles inputs using event.target.id to get name of variable being changed
    // uses event.target.value to get value being changed
    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    // Renders the entire AccountsItem on the DOM
    render() {
        let dateOfBirth = <Moment format="MM/DD/YYYY">{this.props.item.date_of_birth}</Moment>
        return (
            <>
                {this.state.edit === false ?
                    <tr>
                        <td>{this.props.item.first_name} {this.props.item.last_name}</td>
                        <td>{this.props.item.phone_number}</td>
                        <td>{dateOfBirth}</td>
                        {/* address td will be a concatenated string of building_address 1 and 2 */}
                        <td>{this.props.item.building_address1} {this.props.item.building_address2}</td>
                        <td>{this.props.item.zip_code}</td>
                        <td>{this.props.item.county_name}</td>
                        <td>{this.props.item.city}</td>
                        <td>{this.props.item.special_request}</td>
                        <td>{this.props.item.menu_description}</td>
                        <td>{this.props.item.dietary_restrictions}</td>
                        <td>{this.props.item.referral_name}</td>
                        <td>{this.props.item.program_name}</td>
                        {/* if program === ramsey county return a yes/no if else return empty */}
                        <td>
                        {this.props.item.program_id === 1 ?
                            <>
                            {this.props.item.document_signed === true ?
                            <>Signed</>
                            :
                            <>Not Signed</>
                            }
                            </>
                            :
                            <>
                                N/A 
                            </>
                        }
                        </td>
                        {/* this will conditionally render all information to inputs */}
                        <td><button onClick={this.toggleEdit}>Edit</button></td>
                    </tr>
                    :
                    <tr>
                        {/* need to add last name to toggle value */}
                        <td><input value={this.state.first_name} id={'first_name'} onChange={this.handleInput}/>
                        <input value={this.state.last_name} id={'last_name'} onChange={this.handleInput}/></td>
                        <td><input value={this.state.phone_number} id={'phone_number'} onChange={this.handleInput}/></td>
                        <td><input value={this.state.date_of_birth} id={'date_of_birth'} onChange={this.handleInput}/></td>
                        {/* address value will need to be a concatenated string of building_address 1 and 2 */}
                        <td><input value={this.state.building_address1} id={'building_address1'} onChange={this.handleInput}/>
                        <input value={this.state.building_address2} id={'building_address2'} onChange={this.handleInput}/></td>
                        <td><input value={this.state.zip_code} id={'zip_code'} onChange={this.handleInput}/></td>
                        {/* dropdown for county type */}
                        <td><select required value={this.state.county_id} type="dropdown" id={'county_id'} onChange={this.handleInput} >
                            <option value="0"></option>
                            {this.props.counties.map((item) => ( 
                                <option value={item.id}>{item.county_name}</option>
                            ))}
                        </select></td>
                        <td><input value={this.state.city} id={'city'} onChange={this.handleInput}/></td>
                        <td><input value={this.state.special_request} id={'special_request'} onChange={this.handleInput}/></td>
                        <td> <select type="dropdown" value={this.state.meal_choice} id={'meal_choice'} onChange={this.handleInput}>
                            <option value="0"></option>
                            {this.props.menu.map((item) => ( 
                                <option value={item.id}>{item.menu_description}</option>
                            ))}
                        </select></td>
                        <td><input value={this.state.dietary_restrictions} id={'dietary_restrictions'} onChange={this.handleInput}/></td>
                        <td> <select type="dropdown" value={this.state.referral_id} id={'referral_id'} onChange={this.handleInput}>
                            <option value="0"></option>
                            {this.props.organizations.map((item) => ( 
                                <option value={item.id}>{item.referral_name}</option>
                            ))}
                        </select></td>
                        <td> <select type="dropdown" value={this.state.program_id} id={'program_id'} onChange={this.handleInput}>
                            <option value="0"></option>
                            {this.props.programs.map((item) => ( 
                                <option value={item.id}>{item.program_name}</option>
                            ))}
                        </select></td>
                        <td>
                        {this.state.program_id === 1 ?
                            <select type="dropdown" value={this.state.document_signed} id={'document_signed'} onChange={this.handleInput}>
                                <option ></option>
                                <option value="true">Signed</option>
                                <option value="false">Not Signed</option>  
                            </select>
                            :
                            <>N/A</>
                        } 
                        </td>
                        {/* this will conditionally render all information to inputs */}
                        <td><button onClick={this.updateDependent}>Update</button></td>
                    </tr>

                }
            </>
        );//end return
    }//end render
}//end class
const mapStateToProps = (reduxState) => ({
    counties: reduxState.counties,
    organizations: reduxState.organizations,
    menu: reduxState.menu,
    programs: reduxState.programs
});

export default connect(mapStateToProps)(AccountsItem);
