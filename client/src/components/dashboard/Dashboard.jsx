import React from 'react';
// import GridLayout from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import { connect } from 'react-redux';
import { ConnectedCustomBarChart } from '../query/display/Bar';
import { ConnectedCustomLineChart } from '../query/display/Line';
import { openSnackbarWithMessage } from '../../actions/snackbar';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = ({currentDashboardId, dashboardCharts, initialDashboardLayout, setCurrentLayout, openSnackbarWithMessage}) => {

    if (!dashboardCharts.length) {
        return (
            <div style={{margin: '10px'}}>
                Created charts will appear here.
            </div>
        );
    };

    const autoSaveChartLayout = (currentLayout) => {
        let data = {
            dashboard_id: currentDashboardId,
            chartLayout: currentLayout
        }

        return fetch('/dashboard/update-layout', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200) {
                return true;
            } else if (response.status === 500 || response.status === 400) {
                return false;
            }
        })
        .catch(error => {
            openSnackbarWithMessage(`${error}`);
        });
    };

    const getGridItems = () => {
        return dashboardCharts.map((chartInfo, index) => {
            let {id, name, config, type} = chartInfo;
            let chartGridItemId=`${id}-${name}-${type}`;
            if (type === 'Bar') {
                return (
                    <div key={chartGridItemId} data-grid={{i: chartGridItemId, x: 0, y: 0, w: 3, h: 6, minW: 3, minH: 6, autoSize:true}}><ConnectedCustomBarChart chartId={id} name={name} config={config}/></div>
                );
            } else if (type === 'Line') {
                return (
                    <div key={chartGridItemId} data-grid={{i: chartGridItemId, x: 0, y: 0, w: 3, h: 6, minW: 3, minH: 6, autoSize:true}}><ConnectedCustomLineChart chartId={id} name={name} config={config}/></div>
                );
            } else {
                throw new Error('Bad Chart config!')
            }
        });
    };

    // TODO: use responsive layout
    // Reference: https://github.com/STRML/react-grid-layout#grid-item-props
    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={initialDashboardLayout}
            isBounded={true}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            rowHeight={30}
            onLayoutChange={(layout, layouts) => {
                setCurrentLayout(layouts);
                autoSaveChartLayout(layouts);
            }}
        >
            {getGridItems()}
        </ResponsiveGridLayout>
    )
}


const mapStateToProps = state => {
    return {
        currentDashboardId: state.dashboard.currentDashboard.id,
        dashboardCharts: state.dashboard.currentDashboardCharts,
        initialDashboardLayout: state.dashboard.currentDashboard.chart_layout || [],
    }
}

const mapDispatchToProps = {
    openSnackbarWithMessage
};

export const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);