import React, { Component } from 'react';

class UserAccountView extends Component {
    // Renders the entire UserAccountView on the DOM
    render() {
        return (
            <div className="UserAccountView">
                <div>
                    <h2>Your Account</h2>
                </div>
                <div>
                    <p>Name: </p>
                    <p>Email: </p>
                    <p>Phone Number: </p>
                    <p>Address: </p>
                    <p>City: </p>
                    <p>County: </p>
                    <p>Date Of Birth: </p>
                    <p>Meal Choice: Meat/Veggie/Special Requests</p>
                    <p>Dietary Restrictions: </p>
                    <p>Special Requests: <textarea></textarea> </p>
                    <button>Make Changes</button>
                </div>
            </div>
        );//end return
    }//end render
}//end class

export default UserAccountView;