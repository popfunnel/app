import React from 'react';
import GridLayout from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import { connect } from 'react-redux';
import { CustomBarChart } from '../query/display/Bar';
import { CustomLineChart } from '../query/display/Line';
import {openSnackbarWithMessage} from '../../actions/snackbar';

const Dashboard = ({currentDashboardId, dashboardCharts, initialDashboardLayout, setCurrentLayout, openSnackbarWithMessage}) => {

    if (!dashboardCharts.length) {
        return (
            <div style={{margin: '10px', textAlign: 'center'}}>
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
            // console.log(`${id}-${name}-${type}`)
            if (type === 'Bar') {
                return (
                    <div key={`${id}-${name}-${type}`} data-grid={{x: 0, y: 0, w: 5, h: 10, autoSize:true}}><CustomBarChart config={config}/></div>
                );
            } else if (type === 'Line') {
                return (
                    <div key={`${id}-${name}-${type}`} data-grid={{x: 0, y: 0, w: 3, h: 6, autoSize:true}}><CustomLineChart config={config}/></div>
                );
            } else {
                throw new Error('Bad Chart config!')
            }
        });
    };

    // TODO: use responsive layout
    // Reference: https://github.com/STRML/react-grid-layout#grid-item-props
    // TODO: add multiple y axis series 

    // context menu for grids https://material-ui.com/components/menus/
    return (
        <GridLayout
            className="layout"
            layout={initialDashboardLayout}
            cols={12}
            rowHeight={30}
            width={1800}
            onLayoutChange={(layout) => {
                // TODO: save chart layout in dashboard action?
                setCurrentLayout(layout);
                autoSaveChartLayout(layout);
            }}
        >
            {getGridItems()}
        </GridLayout>
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