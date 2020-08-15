import { combineReducers } from 'redux'
import query from './query'
import chart from './chart'

export default combineReducers({
    query,
    chart
})