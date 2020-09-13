import * as queryActions from '../actions/queryTool';
import * as actions from '../actions/dashboard';

const initialState = {
    currentDashboard: 'example-dashboard1',
    dashboardChartConfigs: [],
    dashboards: ['example-dashboard1', 'example-dashboard2']
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

function setCurrentDashboard(state, dashboard) {
    return {
        ...state,
        currentDashboard: dashboard
    }
}


export default function dashboard(state = initialState, action) {
    switch (action.type) {
        case queryActions.SAVE_CHART_CONFIG:
            return saveChartConfig(state, action.chartConfig);
        case actions.SET_CURRENT_DASHBOARD:
            return setCurrentDashboard(state, action.dashboard);    
        default:
            return state;
    };
}