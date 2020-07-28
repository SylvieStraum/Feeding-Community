import React, { Component } from 'react';
import {connect} from 'react-redux';
import './AdminDashboard.css';

class AdminDashboard extends Component {
    // Renders the entire AdminDashboard on the DOM
    render() {
        return (
            <div className="AdminDashboard">
                <div className="dashboardItem">
                    {/* this will eventually have a string interpolation with the current date */}
                    <h2>Admin Dashboard 7/28/20</h2>
                </div>
                <div className="mealBox dashboardItem">
                    {/* this will have a map of reduxState with meal totals */}
                    Meals: 100
                    Special Requests: 10
                    Total: 110
                </div>
            </div>
        );//end return
    }//end render
}//end class
//map to reduxSate to grab total number of meals served that day
export default connect()(AdminDashboard);