import * as actions from '../actions/database'

const initialState = {
    isModalOpen: false,
    currentDbId: '',
    dbCreds: [],
    dbConnections: []
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

function setDbConnections(state, dbConnections) {
    return {
        ...state,
        dbConnections: dbConnections
    }
}

// Note: should db options be db connections?
// TODO: create setDbOptions

export default function database(state = initialState, action) {
    switch (action.type) {
        case actions.SET_DATABASE_MODAL_OPEN_STATUS:
            return setIsModalOpenStatus(state, action.status);
        case actions.SET_CURRENT_DB_ID:
            return setCurrentDbId(state, action.databaseId);
        case actions.SET_DB_CREDS:
            return setDbCreds(state, action.dbCreds);
        case actions.SET_DB_CONNECTIONS:
            return setDbConnections(state, action.dbConnections);
        default:
            return state
    }
}