import * as actions from '../actions/database'

const initialState = {
    isModalOpen: false
}


function setIsModalOpenStatus(state, status) {
    return {
        ...state,
        isModalOpen: status
    }
}

export default function database(state = initialState, action) {
    switch (action.type) {
        case actions.SET_DATABASE_MODAL_OPEN_STATUS:
            return setIsModalOpenStatus(state, action.status);
        default:
            return state
    }
}