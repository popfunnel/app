import React from 'react';
import Paper from '@material-ui/core/Paper';
// TODO create index.js file to import all these guys
import { ConnectedResultsTable } from './Table'
import { CustomBarChart } from './Bar'
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

const DisplayContainer = ({queryResults, seriesType, config}) => {
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

    const getChart = () => {
        if (seriesType === 'Bar') {
            return <CustomBarChart config={config}/>
        } else if (seriesType === 'Line') {
            return <CustomLineChart config={config}/>
        }
    }

    const getDisplay = () => {
        if (!queryResults.length) {
            return <NoResults/>
        } else if (seriesType === 'Table') {
            return <ConnectedResultsTable/>    
        } else {
            return (
                <div style={{display:'flex', alignItems: 'center', justifyContent:'center', height:'85%', width:'100%'}}>
                    <div style={{height:'80%', width:'80%'}}>
                    {getChart()}
                    </div>
                </div>
            );
        };
    }

    return (
        <div style={{flex: 1}}>
            <SeriesTitle/>
            {getDisplay()}
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log(JSON.stringify(state.chart.config));
    return {
        queryResults: state.query.rawResults,
        seriesType: state.chart.seriesType,
        config: state.chart.config
    }
}

const mapDispatchToProps = {};

export const ConnectedDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(DisplayContainer);