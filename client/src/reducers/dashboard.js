import * as actions from '../actions/dashboard';

const initialState = {
    currentDashboard: {
        id: 'default',
        name: ''
    },
    currentDashboardCharts: [],
    dashboardOptions: []
};

function refreshDashboardInfo(state, currentDashboardInfo, currentDashboardCharts, dashboardOptions) {
    return {
        ...state,
        currentDashboard: currentDashboardInfo,
        currentDashboardCharts: currentDashboardCharts,
        dashboardOptions: dashboardOptions
    };
};

function resetDashboardInfo(state) {
    return {
        ...state,
        currentDashboard: {
            id: 'default'
        },
        currentDashboardCharts: [],
        dashboardOptions: []
    }
};


export default function dashboard(state = initialState, action) {
    switch (action.type) {
        case actions.REFRESH_DASHBOARD_INFO:
            return refreshDashboardInfo(state, action.currentDashboardInfo, action.currentDashboardCharts, action.dashboardOptions);
        case actions.RESET_DASHBOARD_INFO:
            return resetDashboardInfo(state);
        default:
            return state;
    };
}