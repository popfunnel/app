import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ConnectedXSelection } from './XSelection';
import { ConnectedYSelections } from './YSelections';
import { ConnectedSeriesSelections } from './SeriesSelections';
import { ConnectedNamesColumn } from './NamesColumn';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'row',
    }
}));

export const ColumnSelector = ({queryResults}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ConnectedNamesColumn/>
            <ConnectedXSelection/>
            <ConnectedYSelections/>
            <ConnectedSeriesSelections/>
        </div>
    )
};