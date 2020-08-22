import { combineReducers } from 'redux';
import query from './query';
import chart from './chart';
import nav from './nav';

export default combineReducers({
    query,
    chart,
    nav
})