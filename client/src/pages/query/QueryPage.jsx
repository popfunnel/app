import React from 'react';
import { QueryInput } from '../../components/query/input/QueryInput';
import { QueryDisplay } from '../../components/query/QueryDisplay';
import { QueryActions } from '../../components/query/actions/QueryActions';

// TODO wrap in redux!!!!
export const QueryPage = () => {
    let [queryInput, setQueryInput] = React.useState('SELECT * FROM actor LIMIT 10');
    let [queryResults, setQueryResults] = React.useState('');
    let [seriesType, setSeriesType] = React.useState('Table');
    
    let queryUserDB = () => {
        const data = {
            query: queryInput
        };
        
        fetch('/queries/executeQuery', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            setQueryResults(data);
        })
    };

    return (
        <div style={{display:'flex', flexDirection:'row', width: '100%'}}>
            <div style={{display:'flex', flexDirection:'column', width: '100%'}}>
                <QueryInput queryInput={queryInput} setQueryInput={setQueryInput} queryUserDB={queryUserDB}/>
                <QueryDisplay queryResults={queryResults} seriesType={seriesType}/>
            </div>
            <div style={{height: '100vh', width:'30vw'}}>
                <QueryActions seriesType={seriesType} setSeriesType={setSeriesType}/>
            </div>
        </div>
    );
};

