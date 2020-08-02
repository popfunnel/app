import React from 'react';
import { QueryInput } from '../../components/query/QueryInput';
import { QueryDisplay } from '../../components/query/QueryDisplay';
import { QueryStyles } from './QueryPageStyles';


export const QueryPage = () => {
    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <QueryInput/>
            <div style={{height:'50px'}}/>
            <QueryDisplay/>
        </div>
    );
};

