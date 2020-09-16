import React from 'react';
import { ConnectedQueryEditor } from '../../components/query/input/QueryEditor';
import { ConnectedChartContainer } from '../../components/query/display/ChartContainer';
import { QueryActions } from '../../components/query/actions/QueryActions';

export const QueryPage = () => {
    return (
        <div style={{display:'flex', flexDirection:'row', width: '100%', maxHeight:'calc(100vh - 64px)'}}>
            <div style={{display:'flex', flexDirection:'column', flex: 1, overflowY:'auto'}}>
                <ConnectedQueryEditor/>
                <ConnectedChartContainer/>
            </div>
            {/* TODO: use breakpoints to determine QueryActions width */}
            <div style={{minWidth:'25vw'}}>
                <QueryActions/>
            </div>
        </div>
    );
};