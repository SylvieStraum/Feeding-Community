const driverRoutes = (state=[], action) =>{
    switch (action.type) {
        case 'SET_ROUTES':
            return action.payload.data;
        default:
            return state;
    };
}

export default driverRoutes;