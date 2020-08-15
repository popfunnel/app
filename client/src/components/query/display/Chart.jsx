import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveBar } from '@nivo/bar'

import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles((theme) => ({
//     paper: {
//       height: '100%',
//       width: '100%',
//     },
//     control: {
//       padding: theme.spacing(2),
//     }
// }));

export const BarChart = ({queryResults, seriesType}) => {
    // const classes = useStyles();
    let attributes = queryResults.length ? Object.keys(queryResults[0]) : [];
    let data = queryResults.map(item => {
        return {
            x: item[attributes[0]],
            y: item[attributes[1]]
        }
    })

    return (
            <div style={{display:'flex', alignItems: 'center', justifyContent:'center', height:'85%', width:'100%'}}>
                <Paper style={{height:'80%', width:'80%'}}>
                    <ResponsiveBar
                        indexBy={'name'}
                        keys={['count']}
                        data={queryResults}
                        colors={{ scheme: 'category10' }}
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
                            legend: 'Genre',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'food',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                    />
                </Paper> 
            </div>
    );
};