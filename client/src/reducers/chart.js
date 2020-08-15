import * as actions from '../actions/queryTool';

const initialState = {
    seriesType: 'Table',
}

function setSeriesType(state, seriesType) {
    return {
        ...state,
        seriesType
    };
};

export default function chart(state = initialState, action) {
    switch (action.type) {
        case actions.SET_SERIES_TYPE:
            return setSeriesType(state, action.seriesType);
        default:
            return state
    }
}