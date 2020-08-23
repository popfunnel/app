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

export const updateXAndChartConfig = (column) => (dispatch, getState) => {
    dispatch(updateXSelection(column));
    dispatch(setChartConfig(getState().query.rawResults));
}

export const UPDATE_Y_SELECTION = 'UPDATE_Y_SELECTION';
export const updateYSelection = (column, selection) => {
    return {
        type: UPDATE_Y_SELECTION,
        column,
        selection
    };
};

export const updateYAndChartConfig = (column, selection) => (dispatch, getState) => {
    dispatch(updateYSelection(column, selection));
    dispatch(setChartConfig(getState().query.rawResults));
}


export const UPDATE_SERIES_SELECTION = 'UPDATE_SERIES_SELECTION';
export const updateSeriesSelection = (column, selection) => {
    return {
        type: UPDATE_SERIES_SELECTION,
        column,
        selection
    };
};

export const updateSeriesAndChartConfig = (column, selection) => (dispatch, getState) => {
    dispatch(updateSeriesSelection(column, selection));
    dispatch(setChartConfig(getState().query.rawResults));
}

export const RESET_USER_QUERY = 'RESET_USER_QUERY';
export const resetUserQuery = () => {
    return {
        type: RESET_USER_QUERY
    }
}

export const SET_CHART_CONFIG = 'SET_CHART_CONFIG';
export const setChartConfig = (rawResults) => {
    return {
        type: SET_CHART_CONFIG,
        rawResults
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

        // let testData = [
        //     {
        //         COLUMN_1: 'A',
        //         COLUMN_2: '1',
        //         COLUMN_3: '3',
        //         COLUMN_4: '5',
        //     },
        //     {
        //         COLUMN_1: 'B',
        //         COLUMN_2: '2',
        //         COLUMN_3: '4',
        //         COLUMN_4: '6',
        //     }
        // ]

        dispatch(setRawResults(data));

        let attributes = data.length ? Object.keys(data[0]) : [];
        dispatch(createColumnSelections(attributes));
        dispatch(setChartConfig(data));
        return data;
    });
};

