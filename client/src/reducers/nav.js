import * as actions from '../actions/nav';

const initialState = {
    isDrawerOpen: false,
}

function setDrawerOpenStatus(state, status) {
    return {
        ...state,
        isDrawerOpen: status
    }
}

export default function nav(state = initialState, action) {
    switch (action.type) {
        case actions.SET_DRAWER_OPEN_STATUS:
            return setDrawerOpenStatus(state, action.status);
        default:
            return state
    }
}