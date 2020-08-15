import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import Paper from '@material-ui/core/Paper';

export const BarChart = ({queryResults, seriesType}) => {
    let attributes = queryResults.length ? Object.keys(queryResults[0]) : [];
    let data = queryResults.map(item => {
        return {
            name: item.name,
            count: parseFloat(item.count)
        };
    })
    
    return (
            <div style={{display:'flex', alignItems: 'center', justifyContent:'center', height:'85%', width:'100%'}}>
                <Paper style={{height:'80%', width:'80%'}}>
                    <ResponsiveBar
                        indexBy={'name'}
                        keys={['count']}
                        data={data}
                        colors={{ scheme: 'accent' }}
                        margin={{
                            "top": 50,
                            "right": 60,
                            "bottom": 50,
                            "left": 60
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: attributes[0],
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: attributes[1],
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                    />
                </Paper> 
            </div>
    );
};