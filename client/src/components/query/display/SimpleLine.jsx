import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from 'recharts';

export const SimpleLine = ({config, colors}) => {

    return (
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
    );
};