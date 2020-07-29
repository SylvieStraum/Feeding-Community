const allOrganizations = (state=[], action) =>{
    switch (action.type) {
        case 'SET_ALL_ORGS':
            return action.payload.data;
        default:
            return state;
    };
}

export default  allOrganizations;