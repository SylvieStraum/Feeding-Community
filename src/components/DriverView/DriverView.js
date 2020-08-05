import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            <div className="DriverView">
                <p>DriverView</p>
            </div>
        );//end return
    }//end render
}//end class

export default connect()(DriverView);