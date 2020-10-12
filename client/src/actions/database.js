export const SET_DATABASE_MODAL_OPEN_STATUS = 'SET_DATABASE_MODAL_OPEN_STATUS';
export const setIsDatabaseModalOpenStatus = (status) => {
    return {
        type: SET_DATABASE_MODAL_OPEN_STATUS,
        status
    }
}