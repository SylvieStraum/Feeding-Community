import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminPage extends Component {

    state = {
        username: '',
        password: ''
    }

    componentDidMount(){
        this.userGet();
    }

    handleChange(event){
        this.state.email_address = event.target.value
    }

    userGet = () => {
        this.props.dispatch({type: 'GET_USERS'})
    }

    newAdmin = () => {
        this.props.dispatch({type: 'POST_NEW_ADMIN' })
        console.log('in post admin')
    }

    deleteAdmin = (id) => {
        console.log('in delete user', id);
        this.props.dispatch({
          type: 'DELETE_ADMIN',
          payload: {id: id}
        })
    }

    render() {
        return (

            <div>
                    <h1>For Admin Use</h1>
                        <h1>List of users</h1>
                    {this.props.state.userList[0] ? (
                        <ul>
                            {this.props.state.userList.map(user => (
                                <div key={user.id} >
                                    <li className="user">{user.username} <button onClick={() => this.deleteAdmin(user.id)}>DELETE</button></li>

                                </div>
                            ))}
                        </ul>
                    ) : (
                            <p>No Data</p>
                        )}

                    <form className='form' onClick={this.newAdmin}>
                        <li>
                            <label>Create New Admin</label>
                            <input type='text' onChange={this.handleChange} placeholder='Enter email address'/>
                        </li>
                        <input className="btn-sml" type="submit" value="create"/>

                    </form>
            </div>
        )
    };
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(AdminPage);
