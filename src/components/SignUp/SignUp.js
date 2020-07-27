import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignUp extends Component {

    render(){
        return(
            <>
            <div>
                <form>
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

                        <p>Are you 60 years of age or older?</p>
                        <select>
                            <option id="Yes">Yes</option>
                            <option id="No">No</option>
                        </select>
                        <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Date of Birth"
                        />
                        <br />
                        <p>Do you or someone in your household have an underlying health concern that makes it unsafe
                            to leave your home?
                        </p>
                        <select>
                            <option id="Yes">Yes</option>
                            <option id="No">No</option>
                            <option id="Prefer not to answer">Prefer not to answer</option>
                        </select>
                        <br />
                        <label></label>
                        <input 
                            type="text"
                            placeholder="If yes, please describe"
                            />
                        <br />
                        <label></label>
                        <input 
                            type="text"
                            placeholder="Referral Organiztation"
                            />
                        <br />
                        <button className="Next Step" onClick={this.nextStep}>Next Step</button>

                    </form>
            </div>
            
            </>
          
          
        )
    }
}

export default connect()(SignUp);