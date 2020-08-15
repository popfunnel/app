import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FlexibleXYPlot, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
      height: '100%',
      width: '100%',
    },
    control: {
      padding: theme.spacing(2),
    }
}));

export const Chart = ({queryResults, seriesType}) => {
    const classes = useStyles();
    let attributes = queryResults.length ? Object.keys(queryResults[0]) : [];
    let data = queryResults.map(item => {
        return {
            x: item[attributes[0]],
            y: item[attributes[1]]
        }
    })

    return (
            <div style={{display:'flex', justifyContent:'center', height:'85%', width:'100%'}}>
                <Paper style={{height:'300px', width:'300px'}}>
                    <FlexibleXYPlot xType={'ordinal'}>
                        <HorizontalGridLines/>
                        <XAxis
                            style={{
                                fontSize:'12px'
                            }}
                        />
                        <YAxis
                            
                        />
                        <VerticalBarSeries
                            data={data}
                            color={'blue'}
                        />
                    </FlexibleXYPlot>
                </Paper> 
            </div>
    );
};