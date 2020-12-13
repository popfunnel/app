import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

import MenuItem from '@material-ui/core/MenuItem';
import {destroyChart, refreshDashboardInfo} from '../../../actions/dashboard';
import Typography from '@material-ui/core/Typography';

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

export const CustomLineChart = ({chartId, name, config, currentDashboardId, refreshDashboardInfo, openSnackbarWithMessage}) => {
    // TODO: map for each yaxis key
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

    return (
        <Paper style={{height:'100%', width:'100%'}} onContextMenu={handleConsoleMenu}>
            <div className={name ? classes.chartTitle : classes.chartTitlePlaceholder}>
                <Typography variant="subtitle2" display="block">{name || 'Untitled Chart'}</Typography>
            </div>
            <div style={{height: '85%'}}>
                <ResponsiveContainer>
                    <LineChart
                        data={config.formattedData}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis width={20}/>
                        <Tooltip />
                        <Line type="monotone" dataKey="Action" stroke="#8884d8" />
                        <Line type="monotone" dataKey="Foreign" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="Sports" stroke="#FD6A02" />
                    </LineChart>
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
        config: state.chart.config
    }
}

const mapDispatchToProps = {};

export const ConnectedCustomLineChart = connect(mapStateToProps, mapDispatchToProps)(CustomLineChart);