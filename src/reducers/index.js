import competitionSelectedReducer from './competitionSelected'
import matchSelectedReducer from './matchSelected'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    competitionSelected: competitionSelectedReducer,
    matchSelected: matchSelectedReducer,
})

export default allReducers;
