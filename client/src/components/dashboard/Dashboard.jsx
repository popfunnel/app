import React from 'react';
import GridLayout from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import { connect } from 'react-redux';
import { CustomBarChart } from '../query/display/Bar';
import { CustomLineChart } from '../query/display/Line';

// const exampleConfigs = [{
// 	"dataKey": "rental_date",
// 	"keys": ["Action", "Foreign", "Sports"],
// 	"data": [{
// 		"rental_date": "2005-07-08",
// 		"Action": 10,
// 		"Foreign": 8,
// 		"Sports": 8
// 	}, {
// 		"rental_date": "2005-07-09",
// 		"Action": 1,
// 		"Foreign": 13,
// 		"Sports": 7
// 	}, {
// 		"rental_date": "2005-07-10",
// 		"Action": 9,
// 		"Foreign": 5,
// 		"Sports": 5
// 	}, {
// 		"rental_date": "2005-07-11",
// 		"Action": 6,
// 		"Foreign": 4,
// 		"Sports": 2
// 	}, {
// 		"rental_date": "2005-07-12",
// 		"Action": 8,
// 		"Foreign": 9,
// 		"Sports": 10
// 	}, {
// 		"rental_date": "2005-07-26",
// 		"Foreign": 1,
// 		"Sports": 1
// 	}, {
// 		"rental_date": "2005-07-27",
// 		"Action": 5,
// 		"Foreign": 14,
// 		"Sports": 7
// 	}, {
// 		"rental_date": "2005-07-28",
// 		"Action": 9,
// 		"Foreign": 10,
// 		"Sports": 11
// 	}, {
// 		"rental_date": "2005-07-29",
// 		"Action": 6,
// 		"Foreign": 6
// 	}]
// }, {
// 	"dataKey": "rental_date",
// 	"keys": ["Action", "Foreign", "Sports"],
// 	"data": [{
// 		"rental_date": "2005-07-08",
// 		"Action": 10,
// 		"Foreign": 8,
// 		"Sports": 8
// 	}, {
// 		"rental_date": "2005-07-09",
// 		"Action": 1,
// 		"Foreign": 13,
// 		"Sports": 7
// 	}, {
// 		"rental_date": "2005-07-10",
// 		"Action": 9,
// 		"Foreign": 5,
// 		"Sports": 5
// 	}, {
// 		"rental_date": "2005-07-11",
// 		"Action": 6,
// 		"Foreign": 4,
// 		"Sports": 2
// 	}, {
// 		"rental_date": "2005-07-12",
// 		"Action": 8,
// 		"Foreign": 9,
// 		"Sports": 10
// 	}, {
// 		"rental_date": "2005-07-26",
// 		"Foreign": 1,
// 		"Sports": 1
// 	}, {
// 		"rental_date": "2005-07-27",
// 		"Action": 5,
// 		"Foreign": 14,
// 		"Sports": 7
// 	}, {
// 		"rental_date": "2005-07-28",
// 		"Action": 9,
// 		"Foreign": 10,
// 		"Sports": 11
// 	}, {
// 		"rental_date": "2005-07-29",
// 		"Action": 6,
// 		"Foreign": 6
// 	}]
// }]

const Dashboard = ({chartConfigs}) => {
    // const layout = [
    //           {i: 'a', x: 0, y: 0, w: 1, h: 2},
    //           {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    //           {i: 'c', x: 4, y: 0, w: 1, h: 2}
    //         ];
    

    // TODO: Add plus button
    if (!chartConfigs.length) {
        return (
            <div>
                Created charts will appear here.
            </div>
        )
    }
    const getGridItems = () => {
        return chartConfigs.map((config, index) => {
            if (config.type === 'Bar') {
                // TODO: use better keys
                return (
                    <div key={`Bar-${index}`} data-grid={{x: 0, y: 0, w: 5, h: 10, autoSize:true}}><CustomBarChart config={config}/></div>
                );
            } else if (config.type === 'Line') {
                // TODO: use better keys
                return (
                    <div key={`Line-${index}`} data-grid={{x: 0, y: 0, w: 3, h: 6, autoSize:true}}><CustomLineChart config={config}/></div>
                );
            } else {
                return (
                    <div>Error</div>
                )
            }
        });
    }


    // TODO: user should be able to select which dashboard they're on
    // TODO: user should have 'add chart' button to add to dashboard
    // TODO: user should be navigated back to dashboards after clicking save config button

    // TODO: use responsive layout
    // TODO: read more about autosize options
    // TODO: read more about react-grid-layout
    // https://github.com/STRML/react-grid-layout#grid-item-props
    // TODO: save saved configs in db/store
    // TODO: add multiple y axis series 
    // return (
    //     <GridLayout className="layout" cols={12} rowHeight={30} width={1800}>
    //         <div key='line' data-grid={{x: 0, y: 0, w: 5, h: 10, autoSize:true}}><ConnectedCustomLineChart/></div>
    //         <div key='bar' data-grid={{x: 5, y: 0, w: 3, h: 6, autoSize:true}}><ConnectedCustomBarChart/></div>
    //     </GridLayout>
    // );
    return (
        <GridLayout className="layout" cols={12} rowHeight={30} width={1800}>
            {getGridItems()}
        </GridLayout>
    )
}


const mapStateToProps = state => {
    return {
        chartConfigs: state.dashboard.dashboardChartConfigs
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