import * as actions from '../actions/queryTool';

const initialState = {
    seriesType: 'Table',
    columnNames: []
}

function setSeriesType(state, seriesType) {
    return {
        ...state,
        seriesType
    };
};

function setColumnNames(state, columnNames) {
    return {
        ...state,
        columnNames
    };
};

export default function chart(state = initialState, action) {
    switch (action.type) {
        case actions.SET_SERIES_TYPE:
            return setSeriesType(state, action.seriesType);
        case actions.SET_COLUMN_NAMES:
            return setColumnNames(state, action.columnNames);
        default:
            return state
    }
}