import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminItem extends Component {

    state = {
        id: 0,
        username: '',
        password: '',
        account_type: 0,
        route_id: 0,
        editPassword: false,
        editUsername: false,
        editAccountType: false,
        editRoute: false
    }

    componentDidMount(){
        this.assignState()
    }

    assignState = () => {
        this.setState({
            id: this.props.user.id,
            username: this.props.user.username,
            account_type: this.props.user.account_type,
            route: this.props.user.route
        })
    }

    editToggleTrue = (event) => {
        this.setState({
            [event.target.id]: true
        })
    }

    editToggleFalse = (value) => {
        this.setState({
            [value]: false
        })
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    deleteAdmin = (event) => {
        console.log('in delete user', event.target.id);
        this.props.dispatch({
          type: 'DELETE_ADMIN',
          payload: {id: event.target.id}
        })
    }

    submitChange = (event) => {
        this.props.dispatch({
          type: 'UPDATE_ADMIN',
          payload: {
              id: this.state.id,
              actionType: event.target.id,
              username: this.state.username,
              password: this.state.password,
              account_type: this.state.account_type,
              route: this.state.route
          }
        }) 
        this.editToggleFalse(event.target.id);
    }

    cancel = (event) => {
        this.editToggleFalse(event.target.id);
        this.assignState();
    }

    render(){
        return(
            <div className="admin-item-container">
                <div>
                    {console.log(this.state)}
                    <h3>Username: <span className="admin-item-username">{this.props.user.username}</span></h3>
                    {this.props.user.account_type === 1 &&
                    <p>Type: Driver</p>
                    }
                    {this.props.user.account_type === 5 &&
                    <p>Type: Editor</p>
                    }
                    {this.props.user.account_type === 10 &&
                    <p>Type: Admin</p>
                    }
                    {this.props.user.account_type === 1 &&
                    <p>Route {this.props.user.route_name}</p>
                    }
                    {/*  edit for password */}
                    { this.state.editPassword === true ?
                        <>
                            <label>New Password</label>
                            <input value={this.state.password} onChange={this.handleInput} id="password" placeholder="New Password"></input>
                            <br />
                            <button className="admin-item-button" onClick={this.submitChange} id="editPassword">Save</button>
                            <button className="admin-item-button" onClick={this.cancel} id="editPassword">Cancel</button>
                        </>
                        :
                        <button className="admin-item-button" onClick={this.editToggleTrue} id="editPassword">Reset Password</button>
                    }

                    {/* edit for username */}
                    { this.state.editUsername === true ?
                        <>
                            <label>Change Username</label>
                            <input value={this.state.username} onChange={this.handleInput} id="username" placeholder="Change Username"></input>
                            <br />
                            <button className="admin-item-button" onClick={this.submitChange} id="editUsername">Save</button>
                            <button className="admin-item-button" onClick={this.cancel} id="editUsername">Cancel</button>
                        </>
                        :
                        <button className="admin-item-button" onClick={this.editToggleTrue} id="editUsername">Change Username</button>
                    }


                    {/* edit for account type */}
                    { this.state.editAccountType === true ?
                        <>
                            <label>Change Account Type</label>
                            <select className="admin-form-input" name="account_type" id="account_type" onChange={this.handleInput} value={this.state.account_type}>
                                <option value="1">Driver</option>
                                <option value="5">Editor</option>
                                <option value="10">Admin</option>
                            </select>
                            <br />
                            <button className="admin-item-button" onClick={this.submitChange} id="editAccountType">Save</button>
                            <button className="admin-item-button" onClick={this.cancel} id="editAccountType">Cancel</button>
                        </>
                        :
                        <button className="admin-item-button" onClick={this.editToggleTrue} id="editAccountType">Change Account Type</button>
                    }


                    {/* drop down for route selection */}
                    { this.state.editRoute === true ?
                            <>
                                <label>Change Route</label>
                                <input value={this.state.password} onChange={this.handleInput} id="route_id" placeholder=""></input>
                                <br />
                                <button className="admin-item-button" onClick={this.submitChange} id="editRoute">Save</button>
                                <button className="admin-item-button" onClick={this.cancel} id="editRoute">Cancel</button>
                            </>
                            :
                            <button className="admin-item-button" onClick={this.editToggleTrue} id="editRoute">Change Route</button>
                    }


                    {/* delete button */}
                    <button className="admin-item-button" onClick={this.deleteAdmin} id={this.props.user.id}>Delete</button> 
                </div>
            </div>
        )//end return
    }//end render
}//end class

const mapStateToProps = state => ({
    userList: state.userList
});

export default connect(mapStateToProps)(AdminItem);