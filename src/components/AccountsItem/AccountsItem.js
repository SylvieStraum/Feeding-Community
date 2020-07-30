import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class AccountsItem extends Component {
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
        county_name: '',
        city: '',
        special_request: '',
        dietary_restrictions: '',
        edit: false
    }

    //PUT request
    editDependent = () => {
        console.log('edit dependent:', this.props.item) //this will target the specific dependent clicked

    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    updateDependent = () => {
        console.log('update dependent', this.props.item)
    }
    // Renders the entire AccountsItem on the DOM
    render() {
        let dateOfBirth = <Moment format="MM/DD/YYYY">{this.props.item.date_of_birth}</Moment>
        return (
            <>
                {this.state.edit === false ?
                    <tr>
                        <td>{this.props.item.first_name} {this.props.item.first_name}</td>
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
                        {this.props.item.program_id === 1 ?
                            <>
                                <td>YES/NO</td>
                            </>
                            :
                            <>
                                <td>n/a</td>
                            </>
                        }
                        {/* this will conditionally render all information to inputs */}
                        <td><button onClick={this.toggleEdit}>Edit</button><button onClick={this.updateDependent}>Update</button></td>
                    </tr>
                    :
                    <tr>
                        {/* need to add last name to toggle value */}
                        <td><input value={this.props.item.first_name} /></td>
                        <td><input value={this.props.item.phone_number} /></td>
                        <td><input value={dateOfBirth} /></td>
                        {/* address value will need to be a concatenated string of building_address 1 and 2 */}
                        <td><input value={this.props.item.building_address1} /></td>
                        <td><input value={this.props.item.zip_code} /></td>
                        <td><input value={this.props.item.county_name} /></td>
                        <td><input value={this.props.item.city} /></td>
                        <td><input value={this.props.special_request} /></td>
                        <td><input value={this.props.menu_description} /></td>
                        <td><input value={this.props.dietary_restrictions} /></td>
                        <td><input value={this.props.item.referral_name} /></td>
                        <td><input value={this.props.item.program_name} /></td>
                        <td><input value={this.props.item.program_id === 1 ?
                            <>
                            {/* this will need a true/false based on the new table update if true return yes/ if false return no/ default is false */}
                                <td>YES/NO</td>
                            </>
                            :
                            <>
                                <td></td>
                            </>
                        } /></td>
                        {/* this will conditionally render all information to inputs */}
                        <td><button onClick={this.toggleEdit}>Edit</button><button onClick={this.updateDependent}>Update</button></td>
                    </tr>

                }
            </>
        );//end return
    }//end render
}//end class

export default connect()(AccountsItem);
