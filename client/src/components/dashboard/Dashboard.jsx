import React from 'react';
import GridLayout from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import { connect } from 'react-redux';
import { CustomBarChart } from '../query/display/Bar';
import { CustomLineChart } from '../query/display/Line';

const Dashboard = ({dashboardCharts, initialDashboardLayout, setCurrentLayout}) => {

    if (!dashboardCharts.length) {
        return (
            <div style={{margin: '10px', textAlign: 'center'}}>
                Created charts will appear here.
            </div>
        );
    };

    const getGridItems = () => {
        return dashboardCharts.map((chartInfo, index) => {
            let {id, name, config, type} = chartInfo;
            if (type === 'Bar') {
                return (
                    <div key={`${id}-${name}-${type}`} data-grid={{x: 0, y: 0, w: 5, h: 10, autoSize:true}}><CustomBarChart config={config}/></div>
                );
            } else if (type === 'Line') {
                return (
                    <div key={`${id}-${name}-${type}`} data-grid={{x: 0, y: 0, w: 3, h: 6, autoSize:true}}><CustomLineChart config={config}/></div>
                );
            } else {
                return (
                    <div>Error</div>
                )
            }
        });
    };

    // TODO: use responsive layout
    // Reference: https://github.com/STRML/react-grid-layout#grid-item-props
    // TODO: add multiple y axis series 
    return (
        <GridLayout
            className="layout"
            layout={initialDashboardLayout}
            cols={12}
            rowHeight={30}
            width={1800}
            onLayoutChange={(layout) => {
                console.log('layout', layout)
                setCurrentLayout(layout)
            }}
        >
            {getGridItems()}
        </GridLayout>
        // <div>
        //     hey
        // </div>
    )
}


const mapStateToProps = state => {
    return {
        dashboardCharts: state.dashboard.currentDashboardCharts,
        initialDashboardLayout: state.dashboard.currentDashboard.chart_layout || [],
    }
}

const mapDispatchToProps = {};

export const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);