const orders = (state=[], action) =>{
    //console.log('in set todays', action.type, action.payload)
    switch (action.type) {
        case 'SET_TODAYS_ORDERS':
            return action.payload.data;
        default:
            return state;
    };
}

export default  orders;