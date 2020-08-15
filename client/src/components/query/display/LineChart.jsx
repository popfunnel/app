import React from 'react';
import Paper from '@material-ui/core/Paper';
import { ResponsiveLine } from '@nivo/line'

export const LineChart = ({queryResults, seriesType}) => {
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
                    <ResponsiveLine
                        indexBy={'name'}
                        keys={['count']}
                        data={[{
                            "id": "genres",
                            "color": "hsl(106, 70%, 50%)",
                            "data": data
                        }]}
                        colors={{scheme: 'accent'}}
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