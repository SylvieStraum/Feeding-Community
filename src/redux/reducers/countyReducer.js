const allCounties = (state=[], action) =>{
    switch (action.type) {
        case 'SET_ALL_COUNTIES':
            return action.payload.data;
        default:
            return state;
    };
}

export default  allCounties;