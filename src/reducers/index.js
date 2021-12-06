import competitionSelectedReducer from './competitionSelected'
import matchSelectedReducer from './matchSelected'
import errorMessageReducer from './errorMessage'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    competitionSelected: competitionSelectedReducer,
    matchSelected: matchSelectedReducer,
    errorMessage: errorMessageReducer,
})

export default allReducers;
