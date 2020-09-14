import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

export const CustomLineChart = ({config}) => {
    // TODO: map for each yaxis key
    return (
        <Paper style={{height:'100%', width:'100%'}}>
            <ResponsiveContainer>
                <LineChart
                    data={config.formattedData}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Action" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Foreign" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Sports" stroke="#FD6A02" />
                </LineChart>
            </ResponsiveContainer>
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