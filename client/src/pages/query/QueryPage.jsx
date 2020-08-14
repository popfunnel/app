import React from 'react';
import { QueryInput } from '../../components/query/input/QueryInput';
import { QueryDisplay } from '../../components/query/QueryDisplay';
import { QueryActions } from '../../components/query/actions/QueryActions';

// TODO wrap in redux!!!!
export const QueryPage = () => {
    let exampleQuery = `SELECT name, count(1)
FROM film_category join category on category.category_id = film_category.category_id 
GROUP BY name 
ORDER BY count DESC 
LIMIT 10`
    let [queryInput, setQueryInput] = React.useState(exampleQuery);
    let [queryResults, setQueryResults] = React.useState('');
    let [seriesType, setSeriesType] = React.useState('Table');
    
    let queryUserDB = (selection) => {
        let queryText = !selection ? queryInput : selection;

        const data = {
            query: queryText
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
        <div style={{display:'flex', flexDirection:'row', width: '100%', maxHeight:'calc(100vh-64px)'}}>
            <div style={{display:'flex', flexDirection:'column', width: '100%' }}>
                <QueryInput queryInput={queryInput} setQueryInput={setQueryInput} queryUserDB={queryUserDB}/>
                <QueryDisplay queryResults={queryResults} seriesType={seriesType}/>
            </div>
            <div style={{width:'30vw'}}>
                <QueryActions seriesType={seriesType} setSeriesType={setSeriesType}/>
            </div>
        </div>
    );
};

