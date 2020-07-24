import React, { Component } from 'react';

class UserAccountView extends Component {
    // Renders the entire UserAccountView on the DOM
    render() {
        return (
            <div className="UserAccountView">
                <div>
                    <h2>Your Account</h2>
                </div>
                <p>Name: </p>
                <p>Email: </p>
                

            </div>
        );//end return
    }//end render
}//end class

export default UserAccountView;