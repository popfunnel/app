import React from 'react';
import { ConnectedQueryEditor } from '../../components/query/input/QueryEditor';
import { ConnectedChartContainer } from '../../components/query/display/ChartContainer';
import { QueryActions } from '../../components/query/actions/QueryActions';
import { ConnectedQueryToolHeader } from '../../components/query/actions/QueryToolHeader';
import { ConnectedDatabaseActions } from '../../components/query/database/DatabaseActions';

export const QueryPage = () => {
    // Reference: https://css-tricks.com/snippets/css/css-box-shadow/
    // TODO: add marginTop to ConnectedChartContainer
    return (
        <>
            <ConnectedQueryToolHeader/>
            <div style={{display:'flex', flexDirection:'row', width: '100%', maxHeight:'calc(100vh - 108px)', marginTop: '5px'}}>
                <div style={{minWidth:'15vw'}}>
                    <ConnectedDatabaseActions/>
                </div>
                <div style={{display:'flex', flexDirection:'column', flex: 1, overflowY:'auto'}}>
                    <ConnectedQueryEditor/>
                    <ConnectedChartContainer/>
                </div>
                {/* TODO: use breakpoints to determine QueryActions width */}
                <div style={{minWidth:'25vw'}}>
                    <QueryActions/>
                </div>
            </div>
        </>
    );
};