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
        if (response.status === 200) {
            return response.json();
        } else {
            console.log('server error', response.status)
            throw new Error('Bad response from server.');
        };
    });
}

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
            return response.json()
        } else {
            throw new Error('Bad response from server.');
        };
    })
    .then(dashboardInfo => {
        let currentDashboardInfo = dashboardInfo;
        return dispatch(refreshDashboardInfo(currentDashboardInfo.id));
    })
    .then(data => {
        let newCurrentDashboardInfo = data.find(dashboardInfo => dashboardInfo.name === dashboardName);
        return newCurrentDashboardInfo;
    });
};

export const updateDashboardChart = (chartId, chartTitle) => (dispatch, getState) => {
    let data = {
        chartId: chartId,
        chartTitle: chartTitle
    }

    return fetch(`/chart/${chartId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Bad response from server.');
        }
    }).catch(error => {

        throw error;
        // let dashboardId =  getState().dashboard.currentDashboard.id
        // return dispatch(refreshDashboardInfo(dashboardId));
        // TODO: update redux store with new chart information
        // TODO: add snackbar indicating success/failure
    })

}