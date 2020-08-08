import React, { Component } from 'react';
import {connect} from 'react-redux';

class OrdersItem extends Component {

    state = {
        editMode: false,
        number_of_meals: 0,
        meal_choice: 0,
        dependent_id: 0,
        id: -1
    }

    componentDidMount(){
        this.sendToState();
    }

    sendToState = () => {
        this.setState({
            number_of_meals: this.props.order.number_of_meals,
            meal_choice: this.props.order.meal_choice,
            dependent_id: this.props.dependent_id,
            id: this.props.order.id
        })
    }

    editToggle = () =>{
        this.setState({
            editMode: !this.state.editMode
        })
    }

    save = () => {
        this.setState({
            editMode: !this.state.editMode
        })
        this.props.dispatch({
            type: 'UPDATE_ORDER',
            payload: {state: this.state, request: this.props.ordersRequest}
        });
    }

    cancel = () => {
        this.editToggle();
        this.setState({
            number_of_meals: this.props.order.number_of_meals,
            meal_choice: this.props.order.meal_choice
        })
    }

    handleInput = (event) => {
        this.setState({
          [event.target.id]: event.target.value  
        })
    }

    render() {
    return (
        <td>
                {this.props.order.number_of_meals ?
                    this.state.editMode === true ?
                        <>
                            <input className="ordersEditInput" onChange={this.handleInput} value={this.state.number_of_meals} id="number_of_meals"></input>
                            <button onClick={this.save}>Save</button>
                            <button onClick={this.cancel}>Cancel</button>
                        </>
                        :
                        <p onClick={this.editToggle}>Amount: {this.props.order.number_of_meals}</p>
                    :
                    <></>
                }
        </td>   
    );//end return
}//end render
}//end class

const mapStateToProps = (reduxState) => ({
    menu: reduxState.menu,
    ordersRequest: reduxState.ordersRequest
});

export default connect(mapStateToProps)(OrdersItem);