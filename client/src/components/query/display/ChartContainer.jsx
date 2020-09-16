import React from 'react';
import Paper from '@material-ui/core/Paper';
// TODO create index.js file to import all these guys
import { ConnectedResultsTable } from './Table'
import { ConnectedCustomBarChart } from './Bar'
import { ConnectedCustomLineChart } from './Line'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { asOutputContainer }  from './OutputContainer';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: 'auto',
        height: '100%',
        width: '100%',
    },
    control: {
      padding: theme.spacing(2),
    }
}));

const ChartContainer = ({queryResults, seriesType, config}) => {
    const classes = useStyles();

    // TODO: create fixed chart container(Paper) with overflow auto
    // TODO: output dropdown should be fixed size with overflow auto
    // TODO: add row numbers to table, headers should be styled

    const getChart = () => {
        let ChartComponent = ConnectedResultsTable;
        if (seriesType === 'Table') {
            ChartComponent = ConnectedResultsTable;
        } else if (seriesType === 'Bar') {
            ChartComponent = ConnectedCustomBarChart;
        } else if (seriesType === 'Line') {
            ChartComponent = ConnectedCustomLineChart;
        }
        let Chart = asOutputContainer(ChartComponent);
        return <Chart noResultsMsg={'Start by running a query using the editor!'}/>
    };

    return (
        <div style={{flex: 1}}>
            <Typography variant="h6" display="block">Chart</Typography>
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