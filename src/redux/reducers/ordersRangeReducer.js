const orders = (state=[], action) =>{
    switch (action.type) {
        case 'SET_RANGE_ORDERS':
            console.log('action.payload:' , action.payload)
            return action.payload;
        default:
            return state;
    };
}

export default  orders;