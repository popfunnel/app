import React from 'react';
import { ConnectedQueryInput } from '../../components/query/input/QueryInput';
import { ConnectedDisplayContainer } from '../../components/query/display/DisplayContainer';
import { QueryActions } from '../../components/query/actions/QueryActions';
import { connect } from 'react-redux'
import { setRawResults } from '../../actions/queryTool';


const QueryPage = ({setRawResults, queryInput}) => {

    let [seriesType, setSeriesType] = React.useState('Table');
    

    // TODO: move this  actions
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
                <ConnectedQueryInput queryUserDB={queryUserDB}/>
                <ConnectedDisplayContainer seriesType={seriesType}/>
            </div>
            <div style={{width:'30vw'}}>
                <QueryActions seriesType={seriesType} setSeriesType={setSeriesType}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        results: state.query.rawResults,
        queryInput: state.query.userInput
    }
}

const mapDispatchToProps = {
    setRawResults
};

export const ConnectedQueryPage = connect(mapStateToProps, mapDispatchToProps)(QueryPage);