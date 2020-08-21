import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer} from 'recharts';

const CustomBarChart = ({config}) => {
    
    // TODO: Create color selector
    let defaultColors = ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0']
    let colors = defaultColors;

    let {
        dataKey,
        keys,
        data
    } = config;


    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent:'center', height:'85%', width:'100%'}}>
            <Paper style={{height:'75%', width:'85%'}}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={dataKey}/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {keys.map((key, index) => {
                            let colorIndex = index%5;
                            return <Bar key={key} dataKey={key} fill={colors[colorIndex]}/>
                        })}
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