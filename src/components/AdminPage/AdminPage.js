import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminItem from './AdminItem'
//import { actionChannel } from 'redux-saga/effects';

class AdminPage extends Component {

    state = {
        admin_username: '',
        edit_admin: '',
        new_admin: '',
        current_selected_admin: '',
        account_type: '',
        username: '',
        password: ''
        // account_type: ''
    }

    componentDidMount(){
        this.userGet();
    }

    userGet = () => {
        this.props.dispatch({type: 'GET_USERS'})
    }

    // newAdmin = () => {
    //     this.props.dispatch({type: 'POST_NEW_ADMIN' })
    //     console.log('in post admin')
    // }

    handleAdminChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    addNewAdmin = (event) => {
        this.props.dispatch({
            type: 'POST_NEW_ADMIN',
            payload: {username: this.state.username, password: this.state.password, account_type: this.state.account_type}
        })
        this.setState({
            new_admin: '',
        })
    }
    

    editAdmin = (event) => {
        this.setState({
            edit_admin: event.target.value
        })
        console.log(this.state.edit_admin)
    }

    submitChange = (id) => {
        this.props.dispatch({type: 'UPDATE_ADMIN', payload: {id: id, username: this.state.edit_admin}})
    }

    selectedAdmin = (event) => {
        this.setState({
            current_selected_admin: event.target.value
        })
    }

    render() {
        return (
        
            <div>
                <form class="formItem">
                <h2>Create New Admin</h2>
                <input value = {this.state.username} id="username" onChange = {this.handleAdminChange} type = 'text' placeholder = 'username' />
                <input value = {this.state.password} id="password" onChange = {this.handleAdminChange} type = 'text' placeholder = 'password' />
                <input value = {this.state.account_type} id="account_type" onChange = {this.handleAdminChange} type = 'text' placeholder = 'account type' />
                <br />
                <button onClick = {this.addNewAdmin}>Add Admin</button>
                <h2>Current Admin</h2>
                {this.props.userList.map((user) => (
                    <AdminItem key={user.id} user={user} />
                        
                ))
                }
                </form>
            </div>
        


        )//end return
    }//end
}//end class

const mapStateToProps = state => ({
    userList: state.userList
});

export default connect(mapStateToProps)(AdminPage)

{/* <input type='radio' value={user.id} id={index} name="teams" onChange={(event) => this.selectedAdmin(event)} />
                        <label htmlFor={index}>{user.username}</label>
                        <input onChange = {(event) => this.editAdmin(event)} type= 'text' placeholder = 'Admin'></input>
                        <button onClick = {() => this.submitChange(user.id)}>Edit Team</button>
                        <button onClick = {() => this.deleteAdmin(user.id)}>Delete Team</button>
                        <button onClick={this.handleClick}>Admin Home</button>
                        <br></br>  
                        </div>  */};
