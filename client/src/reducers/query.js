import * as actions from '../actions/queryTool';

const initialState = {
    rawResults: [],
    userInput: '',
    isLoading: false,
}

function setRawResults(state, rawResults) {
    return {
        ...state,
        rawResults,
        isLoading:false
    };
};

function setUserInput(state, userInput) {
    return {
        ...state,
        userInput,
        isLoading: true
    };
};

function resetUserQuery(state) {
    return {
        ...state,
        rawResults: [],
        userInput: ''
    }
}

export default function query(state = initialState, action) {
    switch (action.type) {
        case actions.SET_RAW_RESULTS:
            return setRawResults(state, action.rawResults);
        case actions.SET_USER_QUERY:
            return setUserInput(state, action.queryInput);
        case actions.RESET_USER_QUERY:
            return resetUserQuery(state, action.queryInput);
        default:
            return state
    }
}