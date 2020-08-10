const searchStoreDependents = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_DEPENDENTS':
            let storedIds = action.payload.map((item) => item.id)
            console.log('storedIds:', storedIds);
            return storedIds;
        case 'STORED_SEARCH':
            
            return state;
        case 'RESET_SEARCH':
            return []
        default:
            return state;
    };
}

export default searchStoreDependents;