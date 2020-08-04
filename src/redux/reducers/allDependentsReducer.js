const allDependents = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_DEPENDENTS':
            return action.payload.data;
        case 'SEARCH_DEPENDENTS':
            return action.payload;
        default:
            return state;
    };
}

export default allDependents;