import {combineReducers} from 'redux'
import userReducer from './user-reducer'
import globalReducer from './global-reducer'

const allReducer = combineReducers({
    userReducer,
    globalReducer
})

export default allReducer