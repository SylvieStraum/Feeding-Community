const ordersRequest = (state={}, action) =>{
    //console.log('in set todays', action.type, action.payload)
    switch (action.type) {
        case 'SET_ORDERS_REQUEST':
            return action.payload;
        default:
            return state;
    };
}

export default  ordersRequest;