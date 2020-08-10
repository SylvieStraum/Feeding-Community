import React, { Component } from 'react';
import { connect } from 'react-redux';
import DriverViewItems from '../DriverViewItems/DriverViewItems';
import '../Accounts/Accounts.scss';

class DriverView extends Component {
    // Renders the entire DriverView on the DOM

    componentDidMount = () => {
        this.getDriverDependents();
        this.getRoutes();
    }

    getDriverDependents = () => {
        this.props.dispatch({
            type: 'GET_DRIVER_DEPENDENTS',
        })
    }

    getRoutes = () => {
        this.props.dispatch({
            type: 'GET_ROUTES',
        })
    }
    render() {
        return (
            <div className="Accounts">
                    <h2>Route</h2>
                <div className="accountItems driverTable">
                    <table>
                        {/* <caption>Clients</caption> */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Zip Code</th>
                                <th>Meal Type</th>
                                <th>Meal Notes</th>
                                {/* <th>Qualified Program</th> */}
                                <th>Signed</th>
                                {/* <th>Route Assignment</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* this table row and data below will eventually come from a .map of reduxState */}
                            {this.props.reduxState.driverDependents.map((item) => (
                                <DriverViewItems key={item.id} item={item} routeQuery={this.props.reduxState.driverRoutes}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );//end return
    }//end render
}//end class

const mapReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(mapReduxStateToProps)(DriverView);