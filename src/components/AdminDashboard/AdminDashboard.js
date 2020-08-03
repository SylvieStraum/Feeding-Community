import React, { Component } from 'react';
import {connect} from 'react-redux';
import './AdminDashboard.scss';

class AdminDashboard extends Component {
    // Renders the entire AdminDashboard on the DOM

    async componentDidMount() {
        //dispatch to get todays orders
        await this.props.dispatch({ type: 'GET_TODAYS_ORDERS' });
    }//end componentDidMount

    render() {
        return (
            <div className="AdminDashboard">
                <div className="dashboardItem">
                    {/* this will eventually have a string interpolation with the current date */}
                    <h2>Admin Dashboard 7/28/20</h2>
                </div>
                <div className="mealBox dashboardItem">
                    {console.log(this.props.today[0])}
                    {/* this will have a map of reduxState with meal totals */}
                    {this.props.today[1] ?
                    <>
                    Meat: {this.props.today[0].meat}
                    Fish: {this.props.today[0].fish}
                    Veggie: {this.props.today[0].veggie}
                    Special Requests: {this.props.today[0].special}
                    Total: {this.props.today[0].total}
                    </>
                    :
                    <>
                    Meat:
                    Fish: 
                    Veggie:
                    Special Requests:
                    Total:
                    </>
                    }
                </div>
            </div>
        );//end return
    }//end render
}//end class
//map to reduxSate to grab total number of meals served that day
const mapStateToProps = (reduxState) => ({
    today: reduxState.ordersToday
});

export default connect(mapStateToProps)(AdminDashboard);