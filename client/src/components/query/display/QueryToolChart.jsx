import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { SimpleBar } from './SimpleBar'
import { SimpleLine } from './SimpleLine'

import { makeStyles } from '@material-ui/core/styles';
import {refreshDashboardInfo} from '../../../actions/dashboard';
import { connect } from 'react-redux'
    
const useStyles = makeStyles(() => ({
    chartTitle: {
        padding: '10px',
        paddingLeft: '20px',
        color: 'black'
    },
    chartTitlePlaceholder: {
        padding: '10px',
        paddingLeft: '20px',
        color: '#C0C0C0'
    }
}));

const QueryToolChart = ({ seriesType, config, name }) => {
    const classes = useStyles();

    // TODO: Create color selector
    let defaultColors = ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0']
    let colors = defaultColors;

    const getChartTitle = () => (
        <div className={name ? classes.chartTitle : classes.chartTitlePlaceholder}>
            <Typography variant="subtitle2" display="block">{name || 'Untitled Chart'}</Typography>
        </div>
    )

    const getChartComponent = () => {
        if (seriesType === 'Bar') {
            return <SimpleBar config={config} colors={colors}/>;
        } else if (seriesType === 'Line') {
            return <SimpleLine config={config} colors={colors}/>;
        }
    }

    return (
        <Paper style={{height:'100%', width:'100%'}}>
            {getChartTitle()}
            {getChartComponent()}
        </Paper>
    )
};

const mapStateToProps = (state) => {
    return {
        seriesType: state.chart.seriesType,
        config: state.chart.config,
        name: state.chart.name
    };
}

const mapDispatchToProps = {
    refreshDashboardInfo
};

export const ConnectedQueryToolChart = connect(mapStateToProps, mapDispatchToProps)(QueryToolChart);