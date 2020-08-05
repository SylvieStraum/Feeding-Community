const searchDependents = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_DEPENDENTS':
            return action.payload;
        case 'RESET_SEARCH':
            return []
        default:
            return state;
    };
}

export default searchDependents;