const fetchDashboardById = dashboardId => {
    return fetch(`/dashboard/${dashboardId}`)
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Bad response from server.');
            };
        });
};

export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD';
export const setCurrentDashboard = dashboardId => (dispatch, getState) => {
    return fetchDashboardById(dashboardId)
        .then(data => {
            dispatch({type: SET_CURRENT_DASHBOARD, dashboardInfo: data});
        })
};


const fetchDashboardIds = () => {
    return fetch('/dashboard/list').then(response => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('Bad response from server.');
        };
    });
}

export const SET_DASHBOARD_OPTIONS = 'SET_DASHBOARD_OPTIONS';
export const setDashboardOptions = () => async (dispatch, getState) => {
    try {
        let dashboardOptions = await fetchDashboardIds();
        if (dashboardOptions.length) {
            if( getState().dashboard.currentDashboard.id === 'no-dashboards-option') { 
                let currentDashboardInfo = await fetchDashboardById(dashboardOptions[0].id);
                dispatch({type: SET_DASHBOARD_OPTIONS, dashboardOptions: dashboardOptions, newCurrentDashboard: currentDashboardInfo});
            } else {
                dispatch({type: SET_DASHBOARD_OPTIONS, dashboardOptions: dashboardOptions});
            }
        };
        return dashboardOptions;
    } catch (error) {
        throw error;
    }
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
        dispatch(setCurrentDashboard(newCurrentDashboard.id));
    });
} 