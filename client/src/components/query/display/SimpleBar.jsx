import React from 'react';
import {BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer} from 'recharts';

export const SimpleBar = ({config, colors}) => {
    let {
        xAxisKey,
        yAxisKeys,
        formattedData
    } = config;

    return (
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
    );
};