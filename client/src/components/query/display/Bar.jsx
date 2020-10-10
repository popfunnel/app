import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer} from 'recharts';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';

const StyledMenuItem = withStyles((theme) => ({
    root: {
        fontSize: '15px',
    },
}))(MenuItem);

const initialState = {
    mouseX: null,
    mouseY: null,
};

export const CustomBarChart = ({config}) => {
      
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

    // TODO: Create color selector
    let defaultColors = ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0']
    let colors = defaultColors;

    let {
        xAxisKey,
        yAxisKeys,
        formattedData
    } = config;

    return (
        <Paper style={{height:'100%', width:'100%', cursor: 'context-menu'}} onContextMenu={handleConsoleMenu}>
            <ResponsiveContainer>
                <BarChart
                    data={formattedData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={xAxisKey}/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {yAxisKeys.map((key, index) => {
                        let colorIndex = index%5;
                        return <Bar key={key} dataKey={key} fill={colors[colorIndex]}/>
                    })}
                </BarChart>
            </ResponsiveContainer>
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
                <StyledMenuItem onClick={handleClose}>Delete</StyledMenuItem>
            </Menu>
        </Paper>
    );
};

const mapStateToProps = (state) => {
    return {
        config: state.chart.config
    };
}

const mapDispatchToProps = {};

export const ConnectedCustomBarChart = connect(mapStateToProps, mapDispatchToProps)(CustomBarChart);
