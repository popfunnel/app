export const SET_DATABASE_MODAL_OPEN_STATUS = 'SET_DATABASE_MODAL_OPEN_STATUS';
export const setIsDatabaseModalOpenStatus = (status) => {
    return {
        type: SET_DATABASE_MODAL_OPEN_STATUS,
        status
    };
};

export const SET_CURRENT_DB_ID = 'SET_CURRENT_DB_ID';
export const setCurrentDbId = (databaseId) => {
    return {
        type: SET_CURRENT_DB_ID,
        databaseId
    };
};

const fetchDbOptions = () => {
    return fetch('/database/list').then(response => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('Bad response from server.'); 
        }
    })
};

export const SET_DB_CREDS = 'SET_DB_CREDS';
export const getDbCreds = () => async (dispatch, getState) => {
    try {
        let dbCreds = await fetchDbOptions();
        dispatch({type: SET_DB_CREDS, dbCreds});
    } catch (error) {
        throw error;
    }
};