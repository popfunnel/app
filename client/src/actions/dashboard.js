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

const fetchChartsByDashboardId = dashboardId => {
    return fetch(`/chart/${dashboardId}`)
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Bad response from server.');
            };
        })
};

export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD';
export const setCurrentDashboard = dashboardId => async (dispatch, getState) => {
    try {
        // TODO: there is a bit of latency in the ui when changing current dashboard
        const [dashboardInfo, currentDashboardCharts] = 
            await Promise.all([fetchDashboardById(dashboardId), fetchChartsByDashboardId(dashboardId)])
        dispatch({type: SET_CURRENT_DASHBOARD, dashboardInfo, currentDashboardCharts});
        persistCurrentDashboardId(dashboardId);
        return dashboardInfo;
    } catch(error) {
        throw error;
    };
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


export const getCurrentDashboardId = (state) => {
    let currentDashboardId = state.dashboard.currentDashboard.id;
    if (currentDashboardId === 'default' &&
        sessionStorage.getItem('currentDashboardId')) {
        currentDashboardId = sessionStorage.getItem('currentDashboardId');
    };
    
    return currentDashboardId;
};

export const persistCurrentDashboardId = (currentDashboardId) => {
    sessionStorage.setItem('currentDashboardId', `${currentDashboardId}`);
};


export const REFRESH_DASHBOARD_INFO = 'REFRESH_DASHBOARD_INFO';
export const RESET_DASHBOARD_INFO = 'RESET_DASHBOARD_INFO';
export const refreshDashboardInfo = (refreshDashboardId) => async (dispatch, getState) => {
    try {
        let dashboardOptions = await fetchDashboardIds();
        if (dashboardOptions.length) {

            let currentDashboardInfo;
            let currentDashboardCharts;
            if (refreshDashboardId === 'default') {
                currentDashboardInfo = {
                    id: 'default'
                }
                currentDashboardCharts = []
            } else {
                [currentDashboardInfo, currentDashboardCharts] = 
                    await Promise.all([fetchDashboardById(refreshDashboardId),
                        fetchChartsByDashboardId(refreshDashboardId)]);
            }


            dispatch({type: REFRESH_DASHBOARD_INFO, currentDashboardInfo, currentDashboardCharts, dashboardOptions});
            persistCurrentDashboardId(currentDashboardInfo.id);

            return dashboardOptions;  
        } else {
            dispatch({type: RESET_DASHBOARD_INFO});
        }

    } catch (error) {

        throw error;
    }
}

export const createNewDashboard = dashboardName => (dispatch, getState) => {
    let data = {
        name: dashboardName
    }

    // TODO: refactor to use async await
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
            let currentDashboardId = getCurrentDashboardId(getState());
            return dispatch(refreshDashboardInfo(currentDashboardId));
        } else {
            throw new Error('Bad response from server.');
        };
    })
    .then(data => {
        let newCurrentDashboardInfo = data.find(dashboardInfo => dashboardInfo.name === dashboardName);
        return newCurrentDashboardInfo.id;
    });
} 