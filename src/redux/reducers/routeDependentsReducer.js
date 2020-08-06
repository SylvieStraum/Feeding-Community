const allDependents = (state = [], action) => {
    switch (action.type) {
        case 'SET_ROUTE_DEPENDENTS':
            return action.payload.data;
        default:
            return state;
    };
}

export default allDependents;