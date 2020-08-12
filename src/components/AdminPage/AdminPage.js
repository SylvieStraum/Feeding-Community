import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminItem from '../AdminItem/AdminItem'
import "./AdminPage.scss";

class AdminPage extends Component {

    state = {
        account_type: 0,
        username: '',
        password: '',
        route: 0
    }

    componentDidMount(){
        this.userGet();
        this.getRoutes();
    }

    userGet = () => {
        this.props.dispatch({type: 'GET_USERS'})
    }
    getRoutes = () => {
        this.props.dispatch({type: 'GET_ROUTES'})
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    addNewAdmin = (event) => {
        this.props.dispatch({
            type: 'POST_NEW_ADMIN',
            payload: {
                username: this.state.username,
                password: this.state.password,
                account_type: this.state.account_type,
                route: this.state.route
            }
        })
        this.setState({
            new_admin: '',
        })
    }
    

    render() {
        return (
            <div>
                {/* {console.log(this.state)} */}
                <form class="formItem">
                    <fieldset>
                        <legend>Create New Admin</legend>
                        <label className="admin-form-label" for="username">Username:</label>
                        <input className="admin-form-input" value = {this.state.username} id="username" onChange={this.handleInput} type="text" placeholder ="Input Username" />
                        <label className="admin-form-label" for="password">Password:</label>
                        <input className="admin-form-input" value = {this.state.password} id="password" onChange={this.handleInput} type="text" placeholder="Input Password" />
                        <label className="admin-form-label" for="account_type">Account Type:</label>
                        <select className="admin-form-input" name="account_type" id="account_type" onChange={this.handleInput} value={this.state.account_type}>
                            <option value="0" disabled>Select Account Type</option>
                            <option value="1">Driver</option>
                            {/* <option value="5">Editor</option> */}
                            <option value="10">Admin</option>
                        </select>
                        
                        {/* {this.state.account_type === "1" &&
                        <>
                        <label className="admin-form-label" for="route_id">Account Type:</label>
                        <select className="admin-form-input" name="route_id" id="route_id" onChange={this.handleInput}>
                            <option value="0" disabled>Select Route</option>
                            {this.props.driverRotues.map((route) => <option value={route.id} key={route.id}>Route: {route.id}</option>
                        )}
                        </select>
                        </>
                        } */}
                        <br />
                        <button className="admin-form-button" onClick={this.addNewAdmin}>Add Admin</button>
                    </fieldset>
                </form>
                <div className="admin-list-container">
                    <h2>Current Admin</h2>
                    {this.props.userList.map((user) => {
                        if(user.id === this.props.user.id) {
                            return false
                        } 
                        else if(user.id === null){
                            return false
                        }
                        else{
                            return (<AdminItem key={user.id} user={user} />)
                        }
                            
                    })
                    }
                </div>
            </div>
        )//end return
    }//end
}//end class

const mapStateToProps = (reduxState) => ({
    userList: reduxState.userList,
    user: reduxState.user,
    driverRotues: reduxState.driverRoutes
});

export default connect(mapStateToProps)(AdminPage)
