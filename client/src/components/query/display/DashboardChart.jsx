import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { SimpleBar } from './SimpleBar'
import { SimpleLine } from './SimpleLine'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {destroyChart, refreshDashboardInfo} from '../../../actions/dashboard';
import { openSnackbarWithMessage } from '../../../actions/snackbar';
import { setChartName } from '../../../actions/queryTool';

import InputBase from '@material-ui/core/InputBase';
import { EditableChartTitle } from '../input/EditableChartTitle'
    
const StyledMenuItem = withStyles((theme) => ({
    root: {
        fontSize: '15px',
    },
}))(MenuItem);

const initialState = {
    mouseX: null,
    mouseY: null,
};

const useStyles = makeStyles((theme) => ({
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

const DashboardChart = ({ seriesType, chartId, name,
    config, currentDashboardId, refreshDashboardInfo,
    openSnackbarWithMessage }) => {

    const classes = useStyles();
    const [mousePosition, setMousePosition] = React.useState(initialState);
    const [chartName, setChartName] = React.useState(name);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setMousePosition({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setMousePosition(initialState);
    };

    const handleDelete = async () => {
        destroyChart(chartId)
        .then(() => {
            refreshDashboardInfo(currentDashboardId)
            .then(() => {
                openSnackbarWithMessage('Chart deleted.');
            })
            .catch(error => {
                openSnackbarWithMessage(`${error}`);
            })
        })
        .catch(error => {
            openSnackbarWithMessage(`${error}`);
        })
    }
    // TODO: Create color selector
    let defaultColors = ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0']
    let colors = defaultColors;

    const getChartTitle = () => (
        <div className={name ? classes.chartTitle : classes.chartTitlePlaceholder}>
             <EditableChartTitle
                handleChange={e => setChartName(e.target.value)}
                error={false}
                value={chartName}
                handleBlur={() => {
                    //save chart
                    console.log('heyyyyy')
                }}
                size={"small"}
            />
        </div>
    )

    const getContextMenu = () => (
        <Menu
            keepMounted
            open={mousePosition.mouseY !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                mousePosition.mouseY !== null && mousePosition.mouseX !== null
                ? { top: mousePosition.mouseY, left: mousePosition.mouseX }
                : undefined
            }
        >
            <StyledMenuItem onClick={handleClose}>Edit</StyledMenuItem>
            <StyledMenuItem onClick={handleDelete}>Delete</StyledMenuItem>
        </Menu>
    )

    const getChartComponent = () => {
        if (seriesType === 'Bar') {
            return <SimpleBar  config={config} colors={colors}/> ;
        } else if (seriesType === 'Line') {
            return <SimpleLine  config={config} colors={colors}/>;
        }
    }

    return (
        <Paper style={{height:'100%', width:'100%'}} onContextMenu={handleContextMenu}>
            {getChartTitle()}
            {getChartComponent()}
            {getContextMenu()}
        </Paper>
    )
};

const mapStateToProps = (state) => {
    return {
        currentDashboardId: state.dashboard.currentDashboard.id
    };
}

const mapDispatchToProps = {
    refreshDashboardInfo,
    openSnackbarWithMessage
};

export const ConnectedDashboardChart = connect(mapStateToProps, mapDispatchToProps)(DashboardChart);