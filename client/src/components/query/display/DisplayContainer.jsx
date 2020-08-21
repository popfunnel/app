import React from 'react';
import Paper from '@material-ui/core/Paper';
// TODO create index.js file to import all these guys
import { ResultsTable } from './Table'
import { ConnectedCustomBarChart } from './Bar'
import { CustomLineChart } from './Line'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'

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

const DisplayContainer = ({queryResults, seriesType}) => {

    const classes = useStyles();
    
    const SeriesTitle = () => {
        return (
            <div style={{paddingLeft: '10px'}}>
                <Typography variant="h6" display="block">{seriesType}</Typography>
            </div>
        );
    }

    const NoResults = () => {
        return (
            <div style={{height:'85%'}}>
                <Paper className={classes.paper}>
                    Your query results will be shown here.
                </Paper>
            </div>
        );
    }

    const getDisplay = () => {
        if (!queryResults.length) {
            return <NoResults/>
        } else if (seriesType === 'Table') {
            return <ResultsTable queryResults={queryResults}/>
        } else if (seriesType === 'Bar') {
            return <ConnectedCustomBarChart/>
        } else if (seriesType === 'Line') {
            return <CustomLineChart queryResults={queryResults}/>
        }
    }

    return (
        <div style={{flex: 1}}>
            <SeriesTitle/>
            {getDisplay()}
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

export const ConnectedDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(DisplayContainer);