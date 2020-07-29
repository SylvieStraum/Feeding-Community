import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignUp extends Component {

    render(){
        return(
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
                    <label></label>
                    <input
                        required
                        type="text"
                        placeholder="Date of Birth"
                        />
                        <br />
                    </form>
            </div>
        )
    }
}

export default connect()(SignUp);