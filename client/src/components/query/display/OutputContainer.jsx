import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    noResults: {
        height: '100%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#C0C0C0'
    },
    control: {
      padding: theme.spacing(2),
    }
}));

// https://reactjs.org/docs/higher-order-components.html
// reference: https://medium.com/practo-engineering/connected-higher-order-component-hoc-93ee63c91526
export const OutputContainer = (Component) => 
    function NewComponent(props) {
        const classes = useStyles();
        const {queryResults, noResultsMsg} = props;

        const NoResults = () => {
            return (
                <div className={classes.noResults}>
                    {noResultsMsg || 'No output.'}
                </div>
            );
        }

        return (
                <Paper style={{height: '40vh', overflowY: 'auto'}}>
                    {!queryResults.length ?
                    <NoResults/> :
                    <Component/>}
                </Paper>
        );
    };

const mapStateToProps = state => ({
    queryResults: state.query.rawResults
});

export const asOutputContainer = compose(
    connect(mapStateToProps, null),
    OutputContainer
);

