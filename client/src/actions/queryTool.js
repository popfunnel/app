import { compileSettings } from '../reducers/chart';

export const SET_RAW_RESULTS = 'SET_RAW_RESULTS';
export const setRawResults = (rawResults) => {
    return {
        type: SET_RAW_RESULTS,
        rawResults
    };
};

export const SET_USER_QUERY = 'SET_USER_QUERY';
export const setUserQuery = (queryInput) => {
    return {
        type: SET_USER_QUERY,
        queryInput
    };
};

export const SET_SERIES_TYPE = 'SET_SERIES_TYPE';
export const setSeriesType = (seriesType) => {
    return {
        type: SET_SERIES_TYPE,
        seriesType
    };
};

export const CREATE_COLUMN_SELECTIONS = 'CREATE_COLUMN_SELECTIONS';
export const createColumnSelections = (columnNames) => {
    return {
        type: CREATE_COLUMN_SELECTIONS,
        columnNames
    };
};

export const UPDATE_X_SELECTION = 'UPDATE_X_SELECTION';
export const updateXSelection = (column) => {
    return {
        type: UPDATE_X_SELECTION,
        column
    };
};

export const UPDATE_Y_SELECTION = 'UPDATE_Y_SELECTION';
export const updateYSelection = (column, selection) => {
    return {
        type: UPDATE_Y_SELECTION,
        column,
        selection
    };
};

export const UPDATE_SERIES_SELECTION = 'UPDATE_SERIES_SELECTION';
export const updateSeriesSelection = (column, selection) => {
    return {
        type: UPDATE_SERIES_SELECTION,
        column,
        selection
    };
};

export const RESET_USER_QUERY = 'RESET_USER_QUERY';
export const resetUserQuery = () => {
    return {
        type: RESET_USER_QUERY
    }
}

export const resetForm = () => (dispatch, getState) => {
    dispatch(resetUserQuery());
    dispatch(setSeriesType('Table'));
}

export const queryDatabase = queryInput => (dispatch, getState) => {
    dispatch(setUserQuery(queryInput));
    const data = {
        query: queryInput
    };
    
    fetch('/queries/executeQuery', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        dispatch(setRawResults(data));
        return data;
    })
    .then(data => {
        let attributes = data.length ? Object.keys(data[0]) : [];
        dispatch(createColumnSelections(attributes));
    });
};

export const FORMAT_DATA = 'SET_FORMATTED_DATA';
export const formatData = (rawResults) => {
    return {
        type: FORMAT_DATA,
        rawResults
    }
}

// TODO: Not sure this is the way to go
// export const formatData = () => (dispatch, getState) => {
//     let state = getState();
//     let compiledSettings = compileSettings(state.chart);
//     let rawResults = state.query.rawResults;

//     const data = {
//         compiledSettings,
//         rawResults
//     };
    
//     return fetch('/data/format', {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         dispatch(setFormattedData(data));
//         return data;
//     });
// }