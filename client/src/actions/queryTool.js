export const SET_RAW_RESULTS = 'SET_RAW_RESULTS';
export const setRawResults = (rawResults) => {
    return {
        type: SET_RAW_RESULTS,
        rawResults
    }
};

export const SET_USER_QUERY = 'SET_USER_QUERY';
export const setUserQuery = (queryInput) => {
    return {
        type: SET_USER_QUERY,
        queryInput
    }
}

export const SET_SERIES_TYPE = 'SET_SERIES_TYPE';
export const setSeriesType = (seriesType) => {
    return {
        type: SET_SERIES_TYPE,
        seriesType
    }
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
    })
};