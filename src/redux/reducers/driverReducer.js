const driverDependents = (state = [], action) => {
    switch (action.type) {
        case 'SET_DRIVER_DEPENDENTS':
            return action.payload.data;
        default:
            return state;
    };
}

export default driverDependents;