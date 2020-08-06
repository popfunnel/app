import React from 'react';
import { QueryInput } from '../../components/query/QueryInput';
import { QueryDisplay } from '../../components/query/QueryDisplay';
// import { QueryStyles } from './QueryPageStyles';

export const QueryPage = () => {
    let [queryInput, setQueryInput] = React.useState('SELECT * FROM actor');
    let [queryResults, setQueryResults] = React.useState('');
    
    let queryUserDB = () => {
        const data = {
            query: queryInput
        };
        
        fetch('/executeQuery', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            setQueryResults(JSON.stringify(data));
        })
    }

    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <QueryInput queryInput={queryInput} setQueryInput={setQueryInput} queryUserDB={queryUserDB}/>
            <div style={{height:'50px'}}/>
            <QueryDisplay queryResults={queryResults}/>
        </div>
    );
};

