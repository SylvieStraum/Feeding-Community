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
        county_id: 0,
        date_of_birth: '',
        special_request: '',
        dietary_restrictions: '',
        meal_choice: 1,
        referral_id: 1,
        program_id: 1
    }

    componentDidMount = () => {
        this.getCounty();
        this.getOrg();
        this.getPrograms();
    }

    getCounty = () => {
        this.props.dispatch({
            type: 'GET_COUNTIES',
        })
    }

    getOrg = () => {
        this.props.dispatch({
            type: 'GET_ORGS',
        })
    }

    getPrograms = () => {
        this.props.dispatch({
            type: 'GET_PROGRAMS',
        })
    }

    createDependent = (event) => {
        event.preventDefault();
        console.log('this.state', this.state)
        this.props.dispatch({ type: 'POST_NEW_DEPENDENT', payload: this.state });
        this.setState({
            first_name: '',
            last_name: '',
            phone_number: '',
            building_address1: '',
            building_address2: '',
            city: '',
            zip_code: '',
            county_id: 0,
            date_of_birth: '',
            special_request: '',
            dietary_restrictions: '',
            meal_choice: 1,
            referral_id: 1,
            program_id: 1
        })

    }

    handleInputs = (event, typeOf) => {
        this.setState({
            [typeOf]: event.target.value
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="intakeForm">
                <h1>Sign Up</h1>
                <div>
                    <form class="base-intake-form" onSubmit={this.createDependent}>
                        <p>Please enter client information:</p>
                        <label></label>
                        <input
                            required
                            type="text"
                            placeholder="First Name"
                            value={this.state.first_name}
                            onChange={(event) => this.handleInputs(event, "first_name")}
                        />
                        <br />
                        <label></label>
                        <input
                            required
                            type="text"
                            value={this.state.last_name}
                            placeholder="Last Name"
                            onChange={(event) => this.handleInputs(event, "last_name")}
                        />
                        <br />
                        <label></label>
                        <input
                            required
                            type="text"
                            value={this.state.phone_number}
                            placeholder="Phone Number"
                            onChange={(event) => this.handleInputs(event, "phone_number")}
                        />
                        <br />
                        <label></label>
                        <input
                            required
                            type="text"
                            value={this.state.building_address1}
                            placeholder="Address 1"
                            onChange={(event) => this.handleInputs(event, "building_address1")}
                        />
                        <br />
                        <label></label>
                        <input
                            type="text"
                            value={this.state.building_address2}
                            placeholder="Address 2"
                            onChange={(event) => this.handleInputs(event, "building_address2")}
                        />
                        <br />
                        <label></label>
                        <input
                            required
                            type="text"
                            value={this.state.city}
                            placeholder="City"
                            onChange={(event) => this.handleInputs(event, "city")}
                        />
                        <br />
                        <label></label>
                        <input
                            required
                            type="number"
                            value={this.state.zip_code}
                            placeholder="Zip Code"
                            onChange={(event) => this.handleInputs(event, "zip_code")}
                        />
                        <br />
                        <label></label>
                        <select
                            required
                            type="text"
                            value={this.state.county_id}
                            placeholder="select county"
                            type="dropdown"
                            onChange={(event) =>
                                this.handleInputs(event, "county_id")
                            }>
                            <option value="0">Select County</option>
                            {this.props.counties.map((item) => ( 
                                <option value={item.id}>{item.county_name}</option>
                            ))}
                        </select>
                        <br />
                        <label for="Date of Birth">Date of Birth:</label>
                        <input
                            required
                            type="date"
                            value={this.state.date_of_birth}
                            onChange={(event) => this.handleInputs(event, "date_of_birth")}
                        />
                        <br />
                        <select
                            type="dropdown"
                            value={this.state.meal_choice}
                            placeholder="Select Meat"
                            onChange={(event) => this.handleInputs(event, "meal_choice")

                            }>
                            <option value="1">Select Food Option</option>
                            <option value="2">Chicken or Beef</option>
                            <option value="3">Fish</option>
                            <option value="4">Veggie Only</option>
                            <option value="5">Special Request</option>
                        </select>
                        <label></label>
                        <input
                            required
                            type="text"
                            value={this.state.special_request}
                            placeholder="Special Requests (ex. vegan)"
                            onChange={(event) => this.handleInputs(event, "special_request")}
                        />
                        <br />
                        <label></label>
                        <input
                            required
                            type="text"
                            value={this.state.dietary_restrictions}
                            placeholder="Dietary Restrictions (ex. gluten free)"
                            onChange={(event) => this.handleInputs(event, "dietary_restrictions")}
                        />
                        <br />
                        <p>Referral Organiztation:
                        </p>
                        <select
                            type="dropdown"
                            value={this.state.referral_id}
                            onChange={(event) =>
                                this.handleInputs(event, "referral_id")
                            }>
                                <option value="1">Select Referral Organiztation</option>
                            {this.props.organizations.map((item, i) => (
                                <option value={item.id}>{item.referral_name}</option>
                            ))}
                        </select>
                        <br />
                        <p>Program:
                        </p>
                        <select
                            type="dropdown"
                            value={this.state.program_id}
                            onChange={(event) => 
                                this.handleInputs(event, "program_id")
                            }>
                                <option value="1">Select Program</option>
                            {this.props.programs.map((item, i) => (
                                <option value={item.id}>{item.program_name}</option>
                            ))}
                            </select>
                        <br />
                        <button className="Next Step" onClick={this.createDependant}>Next Step</button>

                    </form>
                </div>

            </div>


        )
    }
}

const mapStateToProps = (reduxState) => ({
    counties: reduxState.counties,
    organizations: reduxState.organizations,
    programs: reduxState.programs
});


export default connect(mapStateToProps)(IntakeForm);