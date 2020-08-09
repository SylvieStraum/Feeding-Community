import React, { Component } from 'react';
import Swal from 'sweetalert2'
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

    componentDidMount() {
        this.assignState();
    }

    assignState = () => {
        this.setState({
            id: this.props.user.id,
            username: this.props.user.username,
            account_type: this.props.user.account_type,
            route_id: this.props.user.route_id
        })
    }

    getRoutes = () => {
        this.props.dispatch({ type: 'GET_ROUTES' })
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
        let user = event.target.id
        Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete this user",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success',
                    this.props.dispatch({
                        type: 'DELETE_ADMIN',
                        payload: {id: user}
                      })
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'This user has not been deleted',
                    'error'
                )
            }
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
                route_id: this.state.route_id
            }
        })
        this.editToggleFalse(event.target.id);
    }

    cancel = (event) => {
        this.editToggleFalse(event.target.id);
        this.assignState();
    }

    render() {
        return (
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
                        <p>Route {this.props.user.route_id}</p>
                    }
                    {/*  edit for password */}
                    {this.state.editPassword === true ?
                        <div>
                            <label>New Password</label>
                            <input value={this.state.password} onChange={this.handleInput} id="password" placeholder="New Password"></input>
                            <br />
                            <button className="admin-item-button" onClick={this.submitChange} id="editPassword">Save</button>
                            <button className="admin-item-button" onClick={this.cancel} id="editPassword">Cancel</button>
                        </div>
                        :
                        <button className="admin-item-button" onClick={this.editToggleTrue} id="editPassword">Reset Password</button>
                    }

                    {/* edit for username */}
                    {this.state.editUsername === true ?
                        <div>
                            <label>Change Username</label>
                            <input value={this.state.username} onChange={this.handleInput} id="username" placeholder="Change Username"></input>
                            <br />
                            <button className="admin-item-button" onClick={this.submitChange} id="editUsername">Save</button>
                            <button className="admin-item-button" onClick={this.cancel} id="editUsername">Cancel</button>
                        </div>
                        :
                        <button className="admin-item-button" onClick={this.editToggleTrue} id="editUsername">Change Username</button>
                    }


                    {/* edit for account type */}
                    {this.state.editAccountType === true ?
                        <div>
                            <label>Change Account Type</label>
                            <select className="admin-form-input" name="account_type" id="account_type" onChange={this.handleInput} value={this.state.account_type}>
                                <option value="1">Driver</option>
                                <option value="5">Editor</option>
                                <option value="10">Admin</option>
                            </select>
                            <br />
                            <button className="admin-item-button" onClick={this.submitChange} id="editAccountType">Save</button>
                            <button className="admin-item-button" onClick={this.cancel} id="editAccountType">Cancel</button>
                        </div>
                        :
                        <button className="admin-item-button" onClick={this.editToggleTrue} id="editAccountType">Change Account Type</button>
                    }


                    {/* drop down for route selection */}
                    {this.state.editRoute === true ?
                        <div>
                            <label>Change Route</label>
                            <select className="admin-form-input" name="route_id" id="route_id" type="dropdown" onChange={this.handleInput} value={this.state.route_id}>
                                <option value="0" >Remove Driver From Route</option>
                                {this.props.driverRotues.map((route) =>
                                    <option value={route.id} key={route.id}>Route: {route.id}</option>
                                )}
                            </select>
                            <br />
                            <button className="admin-item-button" onClick={this.submitChange} id="editRoute">Save</button>
                            <button className="admin-item-button" onClick={this.cancel} id="editRoute">Cancel</button>
                        </div>
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

const mapStateToProps = (reduxState) => ({
    userList: reduxState.userList,
    driverRotues: reduxState.driverRoutes
});

export default connect(mapStateToProps)(AdminItem);