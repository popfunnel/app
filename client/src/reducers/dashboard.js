import * as actions from '../actions/queryTool';

const initialState = {
    currentDashboard: 'test_dashboard',
    dashboardChartConfigs: []
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


export default function dashboard(state = initialState, action) {
    switch (action.type) {
        case actions.SAVE_CHART_CONFIG:
            return saveChartConfig(state, action.chartConfig);
        default:
            return state;
    };
}