import * as actions from '../actions/nav';

const initialState = {
    isDrawerOpen: true,
    isSchemaDropdownOpen: false
}

function setDrawerOpenStatus(state, status) {
    return {
        ...state,
        isDrawerOpen: status
    }
}

function setSchemaDropdownStatus(state, status) {
    return {
        ...state,
        isSchemaDropdownOpen: status
    }
}

export default function nav(state = initialState, action) {
    switch (action.type) {
        case actions.SET_DRAWER_OPEN_STATUS:
            return setDrawerOpenStatus(state, action.status);
        case actions.SET_SCHEMA_DROPDOWN_STATUS:
            return setSchemaDropdownStatus(state, action.status)
        default:
            return state
    }
}