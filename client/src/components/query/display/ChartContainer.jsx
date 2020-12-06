import React from 'react';
import { ConnectedResultsTable } from './Table'
import { ConnectedCustomBarChart } from './Bar'
import { ConnectedCustomLineChart } from './Line'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    noResults: {
        height: '100%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#C0C0C0'
    },
    control: {
      padding: theme.spacing(2),
    }
}));

const ChartContainer = ({seriesType, config, name, queryResults}) => {
    const classes = useStyles();

    const NoResults = () => {
        return (
            <>
                <div className={classes.noResults}>
                    {'Start by running a query using the editor!'}
                </div>
            </>
        );
    }

    const getChart = () => {
        let Chart = ConnectedResultsTable;
        if (seriesType === 'Table') {
            Chart = ConnectedResultsTable;
        } else if (seriesType === 'Bar') {
            Chart = ConnectedCustomBarChart;
        } else if (seriesType === 'Line') {
            Chart = ConnectedCustomLineChart;
        }
        return (
            <Paper style={{height: '40vh', overflowY: 'auto'}}>
                {!queryResults.length ?
                <NoResults/> :
                <Chart name={name} config={config} noResultsMsg={'Start by running a query using the editor!'}/>}
            </Paper>
        )
    };

    return (
        <div style={{flex: 1, marginTop: '5px'}}>
            <div>
                <Typography variant="subtitle1" display="block">Chart</Typography>
            </div>
            {getChart()}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        queryResults: state.query.rawResults,
        seriesType: state.chart.seriesType,
        config: state.chart.config,
        name: state.chart.name
    }
}

const mapDispatchToProps = {};

export const ConnectedChartContainer = connect(mapStateToProps, mapDispatchToProps)(ChartContainer);