import React, { Component } from 'react';
import {connect} from 'react-redux';
import './AdminDashboard.scss';

class AdminDashboard extends Component {
    // Renders the entire AdminDashboard on the DOM
    state = ({
        date: ''
    })

    async componentDidMount() {
        //dispatch to get todays orders
        await this.props.dispatch({ type: 'GET_TODAYS_ORDERS' });
        await this.getDate();
    }//end componentDidMount
    getDate = () =>{
        let today = new Date();
        let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

        this.setState({
            date: date
        })
    }
    
    render() {
        return (
            <div className="AdminDashboard">
                <div className="dashboardItem">
                    {/* this will eventually have a string interpolation with the current date */}
                    <h2>Admin Dashboard {this.state.date}</h2>
                </div>
                <div className="mealBox dashboardItem">
                    {console.log(this.props.today)}
                    {/* this will have a map of reduxState with meal totals */}
                    {this.props.today.totalOrders ?
                    <>
                    {
                        console.log(this.props.today.totalOrders)
                    }
                    Meat: {this.props.today.totalOrders.meat} 
                    Fish: {this.props.today.totalOrders.fish} 
                    Veggie: {this.props.today.totalOrders.veggie} 
                    Special Requests: {this.props.today.totalOrders.special} 
                    Total: {this.props.today.totalOrders.total}
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