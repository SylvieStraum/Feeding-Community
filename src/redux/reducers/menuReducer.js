const menu = (state=[], action) =>{
    switch (action.type) {
        case 'SET_MENU':
            console.log('in menu redux', action.payload)
            return action.payload.data;
        default:
            return state;
    };
}

export default  menu;