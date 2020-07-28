import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../IntakeForm/IntakeForm.css";


class IntakeForm extends Component {

    state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        city: '',
        zipCode: '',
        county: '',
        dateOfBirth: '',
        specialRequests: '',
        dietaryRestrictions: '',
        meal_submission: '',
        organization_submission: ''
    }

    createDependant = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'POST_NEW_DEPENDENT', payload: this.state});

    }

    handleInputs = (event, typeOf) => {
        this.setState({
            [typeOf]: event.target.value
        })
    }

    render(){
        return(
            <>
            <h1>Sign Up</h1>
            <p>Enter client information form</p>
            <div>
                <form onSubmit={this.createDependant}>
                    <p>Please enter client information:</p>
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="First Name"
                        onChange={(event) => this.handleInputs(event, "firstName")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Last Name"
                        onChange={(event) => this.handleInputs(event, "lastName")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Phone Number"
                        onChange={(event) => this.handleInputs(event, "phoneNumber")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Address 1"
                        onChange={(event) => this.handleInputs(event, "address1")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Address 2"
                        onChange={(event) => this.handleInputs(event, "address2")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="City"
                        onChange={(event) => this.handleInputs(event, "city")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Zip Code"
                        onChange={(event) => this.handleInputs(event, "zipCode")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="County"
                        onChange={(event) => this.handleInputs(event, "county")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Date of Birth"
                        onChange={(event) => this.handleInputs(event, "dateOfBirth")}
                        />
                        <br />
                        <p>Meal Type:</p>
                        <select
                            type="dropdown"
                            onChange={(event) => this.handleInputs(event, "meal_submission")
                            
                        }>
                            <option value="Meat">Meat</option>
                            <option value="2nd Meat">2nd Meat</option>
                            <option value="Veggie">Veggie</option>
                            <option value="Special Request">Special Request</option>
                        </select>
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Special Requests"
                        onChange={(event) => this.handleInputs(event, "specialRequests")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Dietary Restrictions"
                        onChange={(event) => this.handleInputs(event, "dietaryRestrictions")}
                        />
                        <br />
                        <p>Referral Organiztation:
                        </p>
                        <select
                            type="dropdown"
                            onChange={(event) => 
                            this.handleInputs(event, "organization_submission")
                            }>
                            <option value="Minneapolis Public Housing Agency">Minneapolis Public Housing Agency</option>
                            <option value="Commonbond Communities">Commonbond Communities</option>
                            <option value="Lakes Day Care">Lakes Day Care</option>
                            <option value="Ebyan ADC">Ebyan ADC</option>
                            <option value="MN Senior Center">MN Senior Center</option>
                            <option value="Nurturing Hands Day Center">Nurturing Hands Day Center</option>
                            <option value="Umatul Islam">Umatul Islam</option>
                        </select>
                        <br />
                        <button className="Next Step" onClick={this.createDependant}>Next Step</button>

                    </form>
            </div>
            
            </>
          
          
        )
    }
}

export default connect()(IntakeForm);