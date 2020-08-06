import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminItem extends Component {

    state = {
        edit_admin: '',
        current_selected_admin: '',
        username: '',
        password: '',
        account_type: ''
    }

    componentDidMount(){
        this.props.dispatch({type: 'GET_USERS'})
    }

    handleAdminChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    deleteAdmin = (id) => {
        console.log('in delete user', id);
        this.props.dispatch({
          type: 'DELETE_ADMIN',
          payload: {id: id}
        })
    }
    editAdmin = (event) => {
        console.log('testing information edit admin', this.props)
        this.setState({
            [event.target.id]: event.target.value
        })
        console.log(this.state.edit_admin)
    }

    selectedAdmin = (event) => {
        this.setState({
            current_selected_admin: event.target.value
        })
    }

    submitChange = (id) => {
        console.log('testing information submit change', this.props)
        this.props.dispatch({type: 'UPDATE_ADMIN', payload: {id: id, username: this.state.edit_admin}})
    }

    render(){
        return(
            <>
            <div>
                <h1>{this.props.user.username}</h1>
                <input value = {this.state.edit_admin} id="edit_admin" onChange = {this.submitChange} type = 'text' placeholder = 'edit_admin' />
                <button onClick = {() => this.submitChange(this.props.user.id)}>Edit</button>
                <button onClick = {() => this.deleteAdmin(this.props.user.id)}>Delete</button> 
            </div>
            {/* <h1>Create New Admin</h1>
                <p>Enter admin username and select add admin</p>
                <input value = {this.state.username} id="username" onChange = {this.handleAdminChange} type = 'text' placeholder = 'username' />
                <input value = {this.state.password} id="password" onChange = {this.handleAdminChange} type = 'text' placeholder = 'password' />
                <input value = {this.state.account_type} id="account_type" onChange = {this.handleAdminChange} type = 'text' placeholder = 'type' /> */}
                
                {/* <input type='radio' value={user.id} id={index} name="teams" onChange={(event) => this.selectedAdmin(event)} />
                        <label htmlFor={index}>{user.username}</label>
                        <input onChange = {(event) => this.editAdmin(event)} type= 'text' placeholder = 'Admin'></input>
                        <button onClick = {() => this.submitChange(user.id)}>Edit</button>
                        <button onClick = {() => this.deleteAdmin(user.id)}>Delete</button> */}
            </>
        )//end return
    }//end render
}//end class

const mapStateToProps = state => ({
    userList: state.userList
});

export default connect(mapStateToProps)(AdminItem);