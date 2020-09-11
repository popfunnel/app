export const OPEN_SNACKBAR_WITH_MESSAGE = 'OPEN_SNACKBAR_WITH_MESSAGE';
export const openSnackbarWithMessage = (message) => {
    return {
        type: OPEN_SNACKBAR_WITH_MESSAGE,
        message
    }
};

export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const closeSnackbar = () => {
    return {
        type: CLOSE_SNACKBAR
    }
}