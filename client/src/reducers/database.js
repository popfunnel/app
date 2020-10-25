import * as actions from '../actions/database'

const initialState = {
    isModalOpen: false,
    currentDbId: 'newDatabase',
    dbCreds: []
}


function setIsModalOpenStatus(state, status) {
    return {
        ...state,
        isModalOpen: status
    }
}

function setCurrentDbId(state, currentDbId) {
    return {
        ...state,
        currentDbId: currentDbId
    }
};

function setDbCreds(state, dbCreds) {
    return {
        ...state,
        dbCreds: dbCreds
    }
}

export default function database(state = initialState, action) {
    switch (action.type) {
        case actions.SET_DATABASE_MODAL_OPEN_STATUS:
            return setIsModalOpenStatus(state, action.status);
        case actions.SET_CURRENT_DB_ID:
            return setCurrentDbId(state, action.databaseId);
        case actions.SET_DB_CREDS:
            return setDbCreds(state, action.dbCreds);
        default:
            return state
    }
}