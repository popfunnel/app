import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compileSettings } from '../../../reducers/chart';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

export const CustomLineChart = ({queryResults, seriesType}) => {
    let attributes = queryResults.length ? Object.keys(queryResults[0]) : [];

    let data = queryResults.map(item => {
        return {
            x: item[attributes[0]],
            y: item[attributes[1]]
        }
    });

    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent:'center', height:'85%', width:'100%'}}>
            <Paper style={{height:'80%', width:'80%'}}>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
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
        </div>
    );
};