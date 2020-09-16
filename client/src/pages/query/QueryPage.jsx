import React from 'react';
import { ConnectedQueryEditor } from '../../components/query/input/QueryEditor';
import { ConnectedDisplayContainer } from '../../components/query/display/DisplayContainer';
import { QueryActions } from '../../components/query/actions/QueryActions';

export const QueryPage = () => {
    return (
        <div style={{display:'flex', flexDirection:'row', width: '100%', maxHeight:'calc(100vh - 64px)'}}>
            <div style={{display:'flex', flexDirection:'column', flex: 1, overflowY:'auto'}}>
                <ConnectedQueryEditor/>
                <ConnectedDisplayContainer/>
            </div>
            <div style={{minWidth:'20vw'}}>
                <QueryActions/>
            </div>
        </div>
    );
};