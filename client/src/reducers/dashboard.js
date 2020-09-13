import * as queryActions from '../actions/queryTool';
import * as actions from '../actions/dashboard';

const initialState = {
    currentDashboard: {
        id: 'no-dashboards-option'
    },
    dashboardChartConfigs: [],
    dashboardOptions: []
};

// TODO: this will be async call to backend
function saveChartConfig(state, chartConfig) {
    // TODO: fetch to set in database!
    let chartConfigs = [...state.dashboardChartConfigs];
    chartConfigs.push(chartConfig);
    
    return {
        ...state,
        dashboardChartConfigs: chartConfigs
    }
}

function setCurrentDashboard(state, dashboardInfo) {
    return {
        ...state,
        currentDashboard: dashboardInfo
    }
}

function setDashboardOptions(state, dashboardOptions, newCurrentDashboard) {

    return {
        ...state,
        currentDashboard: newCurrentDashboard || state.currentDashboard,
        dashboardOptions: [...dashboardOptions]
    }
}


export default function dashboard(state = initialState, action) {
    switch (action.type) {
        case queryActions.SAVE_CHART_CONFIG:
            return saveChartConfig(state, action.chartConfig);
        case actions.SET_CURRENT_DASHBOARD:
            return setCurrentDashboard(state, action.dashboardInfo);
        case actions.SET_DASHBOARD_OPTIONS:
            return setDashboardOptions(state, action.dashboardOptions, action.newCurrentDashboard);
        default:
            return state;
    };
}