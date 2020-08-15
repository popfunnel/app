import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
    },
    formLabelHeader: {
        fontSize: '12px',
        minHeight:'30px'
    },
    formLabel: {
        display: 'flex',
        justifyContent: 'flexStart',
        alignItems:'center',
        fontSize: '12px',
        minHeight:'42px'
    }
}));

export const NamesColumn = ({queryResults}) => {
    const classes = useStyles();

    return (
        <div>
            <FormControl component="fieldset" className={classes.formControl}>
                <div><FormLabel className={classes.formLabelHeader} component="legend">Names</FormLabel></div>
                <FormGroup>
                    <FormLabel className={classes.formLabel}>Cat</FormLabel>
                    <FormLabel className={classes.formLabel}>Dog</FormLabel>
                    <FormLabel className={classes.formLabel}>Bear</FormLabel>
                </FormGroup>
            </FormControl>
        </div>
    );
};