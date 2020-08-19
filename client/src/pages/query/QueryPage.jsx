import React from 'react';
import { ConnectedQueryInput } from '../../components/query/input/QueryInput';
import { ConnectedDisplayContainer } from '../../components/query/display/DisplayContainer';
import { QueryActions } from '../../components/query/actions/QueryActions';

export const QueryPage = () => {
    return (
        <div style={{display:'flex', flexDirection:'row', width: '100%', maxHeight:'calc(100vh-64px)'}}>
            <div style={{display:'flex', flexDirection:'column', flex: 1}}>
                <ConnectedQueryInput/>
                <ConnectedDisplayContainer/>
            </div>
            <div style={{width:'30vw'}}>
                <QueryActions/>
            </div>
        </div>
    );
};