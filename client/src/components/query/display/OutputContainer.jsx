import React from 'react';
import Paper from '@material-ui/core/Paper';

export const withOutputContainer = (Component) => () => {
    return (
        <Paper style={{height: '40vh', overflowY: 'auto'}}>
            <Component/>
        </Paper>
    );
};