import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer} from 'recharts';

export const CustomBarChart = ({config}) => {
    
    // TODO: Create color selector
    let defaultColors = ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0']
    let colors = defaultColors;


    // TODO: rename datakey to 'xaxis datakey'
    let {
        dataKey,
        keys,
        data
    } = config;
    // let testData = [{
    //     "rental_date": "2005-07-08",
    //     "Action": 10,
    //     "Foreign": 8,
    //     "Sports": 8
    // }, {
    //     "rental_date": "2005-07-09",
    //     "Action": 1,
    //     "Foreign": 13,
    //     "Sports": 7
    // }, {
    //     "rental_date": "2005-07-08",
    //     "Action": 30,
    //     "Foreign": 40,
    //     "Sports": 50
    // }, {
    //     "rental_date": "2005-07-09",
    //     "Action": 10,
    //     "Foreign": 20,
    //     "Sports": 50
    // }];

    return (
        <Paper style={{height:'100%', width:'100%'}}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={dataKey}/>
                    {/* TODO: how should this be extracted? */}
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
    );
};

const mapStateToProps = (state) => {
    return {
        config: state.chart.config
    };
}

const mapDispatchToProps = {};

export const ConnectedCustomBarChart = connect(mapStateToProps, mapDispatchToProps)(CustomBarChart);