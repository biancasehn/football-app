const competitionSelectedReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_COMPETITION_SELECTED':
            return action.payload;
        default:
            return state
    }
}

export default competitionSelectedReducer;