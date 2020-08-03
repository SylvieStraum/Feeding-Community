import React, { Component } from 'react';
import {connect} from 'react-redux';
import './AdminDashboard.scss';

class AdminDashboard extends Component {
    // Renders the entire AdminDashboard on the DOM

    async componentDidMount() {
        //dispatch to get todays orders
        await this.props.dispatch({ type: 'GET_TODAYS_ORDERS' });
        console.log(this.props.today)
    }//end componentDidMount

    getTotal = () => {
        if(this.props.today.meal_choice){
            let total = 0
            for (let i = 0; i < this.props.today.meal_choice.length; i++) {
                console.log('meal_choice', this.props.today.meal_choice[i])
                
            }
            return total
        }
        else{
            return 'loading'
        }
    }

    render() {
        return (
            <div className="AdminDashboard">
                <div className="dashboardItem">
                    {/* this will eventually have a string interpolation with the current date */}
                    <h2>Admin Dashboard 7/28/20</h2>
                </div>
                <div className="mealBox dashboardItem">
                    {/* this will have a map of reduxState with meal totals */}
                    Meals: 
                    Special Requests: 10
                    {console.log(this.props.today, )}
                    Total: {this.props.today[0] ? this.getTotal : <>Not Yet</>}
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