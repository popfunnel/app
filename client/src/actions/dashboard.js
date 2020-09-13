export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD';
export const setCurrentDashboard = dashboard => (dispatch, getState) => {
    dispatch({type: SET_CURRENT_DASHBOARD, dashboard});
};

export const SET_DASHBOARD_OPTIONS = 'SET_DASHBOARD_OPTIONS';
export const setDashboardOptions = () => (dispatch, getState) => {
    return fetch('/dashboard/list')
    .then(response => response.json())
    .then(data => {
        if (data.length) {
            dispatch({type: SET_DASHBOARD_OPTIONS, dashboardOptions: data});
        };

        return data;
    });
};

export const createNewDashboard = dashboardName => (dispatch, getState) => {
    let data = {
        name: dashboardName
    }

    return fetch('/dashboard/create', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 201) {
            return dispatch(setDashboardOptions());
        } else {
            throw new Error('Bad response from server.');
        };
    })
    .then(data => {
        let newCurrentDashboard = data.find(dashboardInfo => dashboardInfo.name === dashboardName);
        dispatch(setCurrentDashboard, newCurrentDashboard.id);
    });
} 