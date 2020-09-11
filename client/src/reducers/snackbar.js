import * as actions from '../actions/snackbar';

const initialState = {
    isOpen: false,
    message: ''
}

function openSnackbarWithMessage(state, message) {
    return {
        isOpen: true,
        message: message
    }
}

function closeSnackbar() {
    return {
        isOpen: false,
        message: '',
    }
}

export default function snackbar(state = initialState, action) {
    switch (action.type) {
        case actions.OPEN_SNACKBAR_WITH_MESSAGE:
            return openSnackbarWithMessage(state, action.message);
        case actions.CLOSE_SNACKBAR:
            return closeSnackbar(state, action.message);
        default:
            return state
    }
}