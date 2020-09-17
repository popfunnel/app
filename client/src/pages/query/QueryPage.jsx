import React from 'react';
import { ConnectedQueryEditor } from '../../components/query/input/QueryEditor';
import { ConnectedChartContainer } from '../../components/query/display/ChartContainer';
import { QueryActions } from '../../components/query/actions/QueryActions';

export const QueryPage = () => {
    // Reference: https://css-tricks.com/snippets/css/css-box-shadow/
    // TODO: add marginTop to ConnectedChartContainer
    return (
        <>
            <div style= {{minHeight: '50px', boxShadow: '0 4px 5px -2px black', fontSize: '12px'}}>
                Current Path/ Save actions here
            </div>
            <div style={{display:'flex', flexDirection:'row', width: '100%', maxHeight:'calc(100vh - 98px)'}}>
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