import React from 'react';
import GridLayout from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import { connect } from 'react-redux';
import { ConnectedCustomBarChart } from '../query/display/Bar';
import { ConnectedCustomLineChart } from '../query/display/Line';

const Dashboard = () => {
    // const layout = [
    //           {i: 'a', x: 0, y: 0, w: 1, h: 2},
    //           {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    //           {i: 'c', x: 4, y: 0, w: 1, h: 2}
    //         ];

    return (
        <div style={{height:'100%'}}>
            <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
                <div key='bar' data-grid={{x: 1, y: 0, w: 5, h: 10}}><ConnectedCustomBarChart/></div>
                <div key='line' data-grid={{x: 1, y: 0, w: 5, h: 10}}><ConnectedCustomLineChart/></div>
            </GridLayout>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        config: state.chart.config
    }
}

const mapDispatchToProps = {};

export const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);






// class MyFirstGrid extends React.Component {
//   render() {
//     // layout is an array of objects, see the demo for more complete usage
//     
//     return (
      
//     )
//   }
// }