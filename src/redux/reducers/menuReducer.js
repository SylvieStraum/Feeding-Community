const menu = (state=[], action) =>{
    switch (action.type) {
        case 'SET_MENU':
            return action.payload.data;
        default:
            return state;
    };
}

export default  menu;