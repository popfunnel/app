import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

const CustomBarChart = ({config}) => {
    // let {
    //     indexBy,
    //     keys,
    //     data
    // } = config;

    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent:'center', height:'85%', width:'100%'}}>
            <Paper style={{height:'75%', width:'85%'}}>
                <ResponsiveContainer>
                    <BarChart
                        data={config.data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rental_date"/>
                        <XAxis dataKey="date" axisLine={false} tickLine={false} interval={0} height={1} scale="band" xAxisId="quarter" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Sports" fill="#8884d8" />
                        <Bar dataKey="Foreign" fill="#82ca9d" />
                        <Bar dataKey="Action" fill="#FD6A02" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        config: state.chart.config
    };
}

const mapDispatchToProps = {};

export const ConnectedCustomBarChart = connect(mapStateToProps, mapDispatchToProps)(CustomBarChart);