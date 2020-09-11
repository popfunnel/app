import * as actions from '../actions/user';

const initialState = {
    username: '',
    profile: ''
};

function setUsername(state, username) {
    return {
        ...state,
        username: username
    }
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case actions.SET_USERNAME:
            return setUsername(state, action.username);
        default:
            return state
    }
}