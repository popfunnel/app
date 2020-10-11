const fetchDashboardById = dashboardId => {
    return fetch(`/dashboard/info/${dashboardId}`)
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

const fetchDashboardIds = () => {
    return fetch('/dashboard/list').then(response => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('Bad response from server.');
        };
    });
};

export const destroyChart = (chartId) => {
    let data = {
        chartId: chartId
    };

    return fetch('/chart/destroy', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log('enter here', response.status)
        if (response.status === 200) {
            return response.json();
        } else {
            console.log('server error', response.status)
            throw new Error('Bad response from server.');
        };
    });
}

export const getCurrentDashboardInfo = (state) => {
    let currentDashboardInfo = state.dashboard.currentDashboard;
    if (currentDashboardInfo.id === 'default' &&
        sessionStorage.getItem('currentDashboardInfo')) {
        currentDashboardInfo = JSON.parse(sessionStorage.getItem('currentDashboardInfo'));
    };
    
    return currentDashboardInfo;
};

export const persistCurrentDashboardId = (currentDashboardInfo) => {
    sessionStorage.setItem('currentDashboardInfo', JSON.stringify(currentDashboardInfo));
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
                    id: 'default',
                    name: ''
                }
                currentDashboardCharts = []
            } else {
                [currentDashboardInfo, currentDashboardCharts] = 
                    await Promise.all([fetchDashboardById(refreshDashboardId),
                        fetchChartsByDashboardId(refreshDashboardId)]);
            }


            dispatch({type: REFRESH_DASHBOARD_INFO, currentDashboardInfo, currentDashboardCharts, dashboardOptions});
            persistCurrentDashboardId(currentDashboardInfo);

            return dashboardOptions;  
        } else {
            dispatch({type: RESET_DASHBOARD_INFO});
        }

    } catch (error) {
        throw error;
    }
};

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
            let currentDashboardInfo = getCurrentDashboardInfo(getState());
            return dispatch(refreshDashboardInfo(currentDashboardInfo.id));
        } else {
            throw new Error('Bad response from server.');
        };
    })
    .then(data => {
        let newCurrentDashboardInfo = data.find(dashboardInfo => dashboardInfo.name === dashboardName);
        console.log('here is newCurrentDashboardInfo', newCurrentDashboardInfo)
        return newCurrentDashboardInfo;
    });
};