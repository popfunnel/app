import React from 'react';
import { ConnectedResultsTable } from './Table'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ConnectedQueryToolChart } from './QueryToolChart'

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

const QueryToolChartContainer = ({seriesType, queryResults}) => {
    const classes = useStyles();

    const ContainerTitle = () => (
        <div>
            <Typography variant="subtitle1" display="block">Chart</Typography>
        </div>
    )

    const Chart = () => (
        <Paper style={{height: '40vh', overflowY: 'auto'}}>
            {!queryResults.length ?
            <NoResults/> :
            <ContainerOutput/>}
        </Paper>
    )

    const NoResults = () => (
        <div className={classes.noResults}>
            {'Start by running a query using the editor!'}
        </div>
    );


    const ContainerOutput = () => {
        return seriesType === 'Table' ?
            <ConnectedResultsTable/> :
            <ConnectedQueryToolChart/>
    }

    return (
        <div style={{flex: 1, marginTop: '5px'}}>
            <ContainerTitle />
            <Chart />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        queryResults: state.query.rawResults,
        seriesType: state.chart.seriesType
    }
}

const mapDispatchToProps = {};

export const ConnectedQueryToolChartContainer = connect(mapStateToProps, mapDispatchToProps)(QueryToolChartContainer);