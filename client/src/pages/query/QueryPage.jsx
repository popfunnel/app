import React from 'react';
import { QueryInput } from '../../components/query/input/QueryInput';
import { ConnectedDisplayContainer } from '../../components/query/display/DisplayContainer';
import { QueryActions } from '../../components/query/actions/QueryActions';
import { connect } from 'react-redux'
import { setRawResults } from '../../actions/queryTool';


const QueryPage = ({setRawResults}) => {
    let exampleQuery = `SELECT name, count(1)
FROM film_category join category on category.category_id = film_category.category_id 
GROUP BY name 
ORDER BY count DESC 
LIMIT 10`
    let [queryInput, setQueryInput] = React.useState(exampleQuery);
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
            setRawResults(data);
        })
    };

    return (
        <div style={{display:'flex', flexDirection:'row', width: '100%', maxHeight:'calc(100vh-64px)'}}>
            <div style={{display:'flex', flexDirection:'column', width: '100%'}}>
                <QueryInput queryInput={queryInput} setQueryInput={setQueryInput} queryUserDB={queryUserDB}/>
                <ConnectedDisplayContainer seriesType={seriesType}/>
            </div>
            <div style={{width:'30vw'}}>
                <QueryActions seriesType={seriesType} setSeriesType={setSeriesType}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log('here is the connected query page state', state.query.results)
    return {
        results: state.query.results
    }
}

const mapDispatchToProps = {
    setRawResults
};

export const ConnectedQueryPage = connect(mapStateToProps, mapDispatchToProps)(QueryPage);