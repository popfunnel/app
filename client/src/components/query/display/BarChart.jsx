import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compileSettings } from '../../../reducers/chart';


export const BarChart = ({compiledSettings, chartConfig}) => {
    let {
        indexBy,
        keys,
        data
    } = chartConfig;

    let {
        xAxis,
        yAxis
    } = compiledSettings;

    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent:'center', height:'85%', width:'100%'}}>
            <Paper style={{height:'100%', width:'100%'}}>
                <ResponsiveBar
                    groupMode="grouped"
                    data={data}
                // index by is x axis
                    indexBy={indexBy}
                // series selections
                    keys={keys}
                    
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
                        tickRotation: -25,
                        legend: xAxis,
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: yAxis[0],
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                />
            </Paper> 
        </div>
    );
};

// TODO: place this work as redux action
const getChartConfig = (queryResults, settings) => { 
    let{
        xAxis,
        yAxis,
        series
    } = settings;

    let keys = new Set();
    let indices = new Set();

    queryResults.forEach(row => {
        keys.add(row[series[0]])
        indices.add(row[xAxis]);
    });
    // TODO: data processing needs to be revisited
    // (i.e.) multiple selections?
    let chartConfig = {
        indexBy: xAxis,
        keys: [...keys]
    }

    let dataByIndex = {};
    queryResults.forEach(row => {
        if (!dataByIndex[row[xAxis]]) {
            dataByIndex[row[xAxis]] = {
                [xAxis]: row[xAxis],
                [row[series[0]]]: parseInt(row[yAxis[0]])
            };
        } else {
            dataByIndex[row[xAxis]] = {
                ...dataByIndex[row[xAxis]],
                [row[series[0]]]: parseInt(row[yAxis[0]])
            };
        }
    });

    let formattedData = [...indices].map(index => dataByIndex[index]);
    chartConfig.data = formattedData;

    return chartConfig;
};

const mapStateToProps = (state) => {
    let compiledSettings = compileSettings(state.chart);
    let chartConfig = getChartConfig(state.query.rawResults, compiledSettings);

    return {
        compiledSettings,
        chartConfig
    };
}

const mapDispatchToProps = {};

export const ConnectedBarChart = connect(mapStateToProps, mapDispatchToProps)(BarChart);