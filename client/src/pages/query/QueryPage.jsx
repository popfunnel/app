import React from 'react';
import { ConnectedQueryEditor } from '../../components/query/input/QueryEditor';
import { ConnectedQueryToolChartContainer } from '../../components/query/display/QueryToolChartContainer';
import { QueryActions } from '../../components/query/actions/QueryActions';
import { ConnectedQueryToolHeader } from '../../components/query/actions/QueryToolHeader';
import { ConnectedDatabaseActions } from '../../components/query/database/DatabaseActions';

export const QueryPage = () => {
    // Reference: https://css-tricks.com/snippets/css/css-box-shadow/
    // TODO: add marginTop to ConnectedChartContainer
    // React.useEffect(() => {
    //     fetch('/queries/schema').then(response => {
    //         console.log('fetch successful', response)
    //         return response.json()
    //     }).then(data => {
    //         console.log('here is the data', JSON.stringify(data))
    //     })
    // }, [])
    
    return (
        <>
            <ConnectedQueryToolHeader />
            <div style={{display:'flex', flexDirection:'row', width: '100%', maxHeight:'calc(100vh - 108px)', marginTop: '5px'}}>
                <div style={{width:'300px'}}>
                    <ConnectedDatabaseActions/>
                </div>
                <div style={{display:'flex', flexDirection:'column', flex: 1, overflowY:'auto'}}>
                    <ConnectedQueryEditor />
                    <ConnectedQueryToolChartContainer />
                </div>
                <div style={{width:'350px'}}>
                    <QueryActions />
                </div>
            </div>
        </>
    );
};