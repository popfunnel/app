export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD';
export const setCurrentDashboard = dashboard => (dispatch, getState) => {
    dispatch({type: SET_CURRENT_DASHBOARD, dashboard});
};

// export const GET_DASHBOARD_OPTIONS = 'GET_DASHBOARD_OPTIONS';
export const SET_DASHBOARD_OPTIONS = 'SET_DASHBOARD_OPTIONS';
export const getDashboardOptions = () => (dispatch, getState) => {
    fetch('/dashboard/list')
    .then(response => response.json())
    .then(data => {
        if (data.length) {
            dispatch({type: SET_DASHBOARD_OPTIONS, dashboardOptions: data});
        };
    });
}