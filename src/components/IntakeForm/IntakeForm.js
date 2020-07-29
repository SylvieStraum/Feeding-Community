import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../IntakeForm/IntakeForm.css";


class IntakeForm extends Component {

    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
        building_address1: '',
        building_address2: '',
        city: '',
        zip_code: '',
        county_id: '',
        date_of_birth: '',
        special_request: '',
        dietary_restrictions: '',
        meal_choice: 1,
        referral_id: 1
    }

    createDependent = (event) => {
        event.preventDefault();
        console.log('this.state', this.state)
        this.props.dispatch({type: 'POST_NEW_DEPENDENT', payload: this.state});

    }

    handleInputs = (event, typeOf) => {
        this.setState({
            [typeOf]: event.target.value
        })
    }

    render(){
        console.log(this.state)
        return(
            <>
            <h1>Sign Up</h1>
            <p>Enter client information form</p>
            <div>
                <form onSubmit={this.createDependent}>
                    <p>Please enter client information:</p>
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="First Name"
                        onChange={(event) => this.handleInputs(event, "first_name")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Last Name"
                        onChange={(event) => this.handleInputs(event, "last_name")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Phone Number"
                        onChange={(event) => this.handleInputs(event, "phone_number")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Address 1"
                        onChange={(event) => this.handleInputs(event, "building_address1")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Address 2"
                        onChange={(event) => this.handleInputs(event, "building_address2")}
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
                        onChange={(event) => this.handleInputs(event, "zip_code")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="County"
                        onChange={(event) => this.handleInputs(event, "county_id")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Date of Birth"
                        onChange={(event) => this.handleInputs(event, "date_of_birth")}
                        />
                        <br />
                        <p>Meal Type:</p>
                        <select
                            type="dropdown"
                            onChange={(event) => this.handleInputs(event, "meal_choice")
                            
                        }>
                            <option value="1">Meat</option>
                            <option value="2">2nd Meat</option>
                            <option value="3">Veggie</option>
                            <option value="4">Special Request</option>
                        </select>
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Special Requests"
                        onChange={(event) => this.handleInputs(event, "special_request")}
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Dietary Restrictions"
                        onChange={(event) => this.handleInputs(event, "dietary_restrictions")}
                        />
                        <br />
                        <p>Referral Organiztation:
                        </p>
                        <select
                            type="dropdown"
                            onChange={(event) => 
                            this.handleInputs(event, "referral_id")
                            }>
                            <option value="1">Minneapolis Public Housing Agency</option>
                            <option value="2">Commonbond Communities</option>
                            <option value="3">Lakes Day Care</option>
                            <option value="4">Ebyan ADC</option>
                            <option value="5">MN Senior Center</option>
                            <option value="6">Nurturing Hands Day Center</option>
                            <option value="7">Umatul Islam</option>
                        </select>
                        <br />
                        <button className="Next Step" onClick={this.createDependant}>Next Step</button>

                    </form>
            </div>
            
            </>
          
          
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState,
  });
  

export default connect(mapStateToProps)(IntakeForm);