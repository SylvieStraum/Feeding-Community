import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminPage extends Component {

    state = {
        password: '',
        email_address: ''
    }

    getAdminForm = () => {
        this.props.dispatch({
            type: 'GET_ADMIN',
        })
    }

    componentDidMount(){
        this.newAdmin();
    }

    newAdmin = () => {
        this.props.dispatch({type: 'POST_NEW_ADMIN'})
    }

    deleteAdmin = (data) => {
        console.log('in delete admin', data)
        this.props.dispatch({
           type: 'DELETE_ADMIN',
           payload: data
        })
    }

    render(){
        return(
            <div>
                <h1>For Admin use</h1>
                <h1>List of Admin</h1>
                {this.props.state.userList ? (
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

            </div>
        )
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(AdminPage);
