import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer} from 'recharts';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {destroyChart, refreshDashboardInfo} from '../../../actions/dashboard';
import { openSnackbarWithMessage } from '../../../actions/snackbar';
import { setChartName } from '../../../actions/queryTool';

import Typography from '@material-ui/core/Typography';
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

//BUG: Right click directly into another right click results in the initial chart being deleted
export const CustomBarChart = ({chartId, name, config, currentDashboardId, refreshDashboardInfo, openSnackbarWithMessage, setChartName}) => {
    const classes = useStyles();
    const [mousePosition, setMousePosition] = React.useState(initialState);

    const handleConsoleMenu = (event) => {
        event.preventDefault();
        setMousePosition({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setMousePosition(initialState);
    };

    // TODO: use await for these?
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

    let {
        xAxisKey,
        yAxisKeys,
        formattedData
    } = config;
    
    return (
        <Paper style={{height:'100%', width:'100%'}} onContextMenu={handleConsoleMenu}>
            <div className={name ? classes.chartTitle : classes.chartTitlePlaceholder}>
                {/* 0.875rem */}
                <Typography variant="subtitle2" display="block">{name || 'Untitled Chart'}</Typography>
                {/* <InputBase
                    id='chart-name'
                    className={classes.inputBase}
                    label='Chart Name'
                    value={name}
                    placeholder='Untitled Chart'
                    onChange={e => {
                        // setChartNameHasError(false);
                        setChartName(e.target.value)
                    }}
                    // error={chartNameHasError}
                    inputProps={{
                        style: {
                            fontSize: '17px',
                            padding: '0px'
                        }
                    }}
                /> */}
                {/* <EditableChartTitle
                    handleChange={e => setChartName(e.target.value)}
                    error={false}
                    value={name}
                    handleBlur={() => {
                        //
                        console.log('heyyyyy')
                    }}
                /> */}
            </div>
            <div style={{height: '85%'}}>
                <ResponsiveContainer>
                    <BarChart
                        data={formattedData}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={xAxisKey}/>
                        <YAxis width={20}/>
                        <Tooltip />
                        {yAxisKeys.map((key, index) => {
                            let colorIndex = index%5;
                            return <Bar key={key} dataKey={key} fill={colors[colorIndex]}/>
                        })}
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {chartId &&
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
            </Menu>}
        </Paper>
    );
};

const mapStateToProps = (state) => {
    return {
        currentDashboardId: state.dashboard.currentDashboard.id,
    };
}

const mapDispatchToProps = {
    refreshDashboardInfo, 
    openSnackbarWithMessage,
    setChartName
};

export const ConnectedCustomBarChart = connect(mapStateToProps, mapDispatchToProps)(CustomBarChart);
