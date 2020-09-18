import React from 'react';
// TODO create index.js file to import all these guys
import { ConnectedResultsTable } from './Table'
import { ConnectedCustomBarChart } from './Bar'
import { ConnectedCustomLineChart } from './Line'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { withOutputContainer }  from './OutputContainer';

const ChartContainer = ({queryResults, seriesType, config}) => {
    const getChart = () => {
        let ChartComponent = ConnectedResultsTable;
        if (seriesType === 'Table') {
            ChartComponent = ConnectedResultsTable;
        } else if (seriesType === 'Bar') {
            ChartComponent = ConnectedCustomBarChart;
        } else if (seriesType === 'Line') {
            ChartComponent = ConnectedCustomLineChart;
        }
        let Chart = withOutputContainer(ChartComponent);
        return <Chart noResultsMsg={'Start by running a query using the editor!'}/>
    };

    return (
        <div style={{flex: 1, marginTop: '5px'}}>
            <div style={{marginLeft: '10px'}}>
                <Typography variant="h5" display="block">Chart</Typography>
            </div>
            {getChart()}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        queryResults: state.query.rawResults,
        seriesType: state.chart.seriesType,
        config: state.chart.config
    }
}

const mapDispatchToProps = {};

export const ConnectedChartContainer = connect(mapStateToProps, mapDispatchToProps)(ChartContainer);