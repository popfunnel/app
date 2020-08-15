import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Xselection } from './Xselection';
import { Yselection } from './Yselection';
import { SeriesSelection } from './SeriesSelection';
import { NamesColumn } from './NamesColumn';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'row',
    }
}));

export const ColumnSelections = ({queryResults}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <NamesColumn/>
            <Xselection/>
            <Yselection/>
            <SeriesSelection/>
        </div>
    )
};