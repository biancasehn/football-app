const matchSelectedReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_MATCH_SELECTED':
            return action.payload;
        default:
            return state
    }
}

export default matchSelectedReducer;