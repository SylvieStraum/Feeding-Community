import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../IntakeForm/IntakeForm.css";


class IntakeForm extends Component {

    render(){
        return(
            <>
            <h1>Sign Up</h1>
            <p>Enter client information form</p>
            <div>
                <form>
                    <p>Please enter client information:</p>
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="First Name"
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Last Name"
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Phone Number"
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Address 1"
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Address 2"
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="City"
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Zip Code"
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="County"
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Date of Birth"
                        />
                        <br />
                        <p>Meal Type:</p>
                        <select>
                            <option id="Meat">Meat</option>
                            <option id="2nd Meat">2nd Meat</option>
                            <option id="Veggie">Veggie</option>
                            <option id="Special Request">Special Request</option>
                        </select>
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Special Requests"
                        />
                        <br />
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Dietary Restrictions"
                        />
                        <br />
                        <p>Referral Organiztation:
                        </p>
                        <select>
                            <option id="Minneapolis Public Housing Agency">Minneapolis Public Housing Agency</option>
                            <option id="Commonbond Communities">Commonbond Communities</option>
                            <option id="Lakes Day Care">Lakes Day Care</option>
                            <option id="Ebyan ADC">Ebyan ADC</option>
                            <option id="MN Senior Center">MN Senior Center</option>
                            <option id="Nurturing Hands Day Center">Nurturing Hands Day Center</option>
                            <option id="Umatul Islam">Umatul Islam</option>
                        </select>
                        <br />
                        <button className="Next Step" onClick={this.nextStep}>Next Step</button>

                    </form>
            </div>
            
            </>
          
          
        )
    }
}

export default connect()(IntakeForm);