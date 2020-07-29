const allPrograms = (state=[], action) =>{
    switch (action.type) {
        case 'SET_ALL_PROGRAMS':
            return action.payload.data;
        default:
            return state;
    };
}

export default  allPrograms;