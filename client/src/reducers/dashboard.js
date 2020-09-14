import * as actions from '../actions/dashboard';

const initialState = {
    currentDashboard: {
        id: 'no-dashboards-option'
    },
    currentDashboardCharts: [],
    dashboardOptions: []
};

// // TODO: this will be async call to backend
// function saveChartConfig(state, chartConfig) {
//     // TODO: fetch to set in database!
//     let chartConfigs = [...state.dashboardChartConfigs];
//     chartConfigs.push(chartConfig);
    
//     return {
//         ...state,
//         dashboardChartConfigs: chartConfigs
//     };
// };

function setCurrentDashboard(state, dashboardInfo, currentDashboardCharts) {
    return {
        ...state,
        currentDashboard: dashboardInfo,
        currentDashboardCharts: currentDashboardCharts
    };
};

// function setCurrentDashboardCharts(state, currentDashboardCharts) {
//     return {
//         ...state,
//         currentDashboardCharts: currentDashboardCharts
//     }
// };

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
            id: 'no-dashboards-option'
        },
        currentDashboardCharts: [],
        dashboardOptions: []
    }
};


export default function dashboard(state = initialState, action) {
    switch (action.type) {
        // case queryActions.SAVE_CHART_CONFIG:
        //     return saveChartConfig(state, action.chartConfig);
        case actions.SET_CURRENT_DASHBOARD:
            return setCurrentDashboard(state, action.dashboardInfo, action.currentDashboardCharts);
        // case actions.SET_CURRENT_DASHBOARD_CHARTS:
        //     return setCurrentDashboardCharts(state, action.currentDashboardCharts);
        case actions.REFRESH_DASHBOARD_INFO:
            return refreshDashboardInfo(state, action.currentDashboardInfo, action.currentDashboardCharts, action.dashboardOptions);
        case actions.RESET_DASHBOARD_INFO:
            return resetDashboardInfo(state);
        default:
            return state;
    };
}