export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD';
export const setCurrentDashboard = dashboard => (dispatch, getState) => {
    dispatch({type: SET_CURRENT_DASHBOARD, dashboard});
}