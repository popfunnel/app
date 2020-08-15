import * as actions from '../actions/queryTool';

const initialState = {
    rawResults: [],
}

function setRawResults(state, rawResults) {
    return {
        ...state,
        rawResults
    };
};

export default function query(state = initialState, action) {
    switch (action.type) {
        case actions.SET_RAW_RESULTS:
            return setRawResults(state, action.rawResults);
        default:
            return state
    }
}