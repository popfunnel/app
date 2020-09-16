import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux';

// https://reactjs.org/docs/higher-order-components.html
export const OutputContainer = (Component) => (props) => {
    const {queryResults} = props;

    return (
        <Paper style={{height: '40vh', overflowY: 'auto'}}>
            <Component/>
        </Paper>
    );
};

const mapStateToProps = state => ({
    queryResults: state.query.rawResults
});

export const withOutputContainer = compose(
    connect(mapStateToProps, null),
    OutputContainer
);

