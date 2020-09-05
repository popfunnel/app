import { combineReducers } from 'redux';
import query from './query';
import chart from './chart';
import nav from './nav';
import dashboard from './dashboard';
import user from './user';

export default combineReducers({
    query,
    chart,
    nav,
    dashboard,
    user
})