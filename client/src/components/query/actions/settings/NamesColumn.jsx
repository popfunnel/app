import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { connect } from 'react-redux'

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

const NamesColumn = ({columnNames}) => {
    const classes = useStyles();

    return (
        <div>
            <FormControl component="fieldset" className={classes.formControl}>
                <div><FormLabel className={classes.formLabelHeader} component="legend">Names</FormLabel></div>
                <FormGroup>
                    {columnNames.map(columnName => {
                        return <FormLabel key={columnName} className={classes.formLabel}>{columnName}</FormLabel>
                    })}
                </FormGroup>
            </FormControl>
        </div>
    );
};

const mapStateToProps = (state) => {
    let selections = state.chart.columnSelections;
    return {
        columnNames: selections.columnNames
    }
}

const mapDispatchToProps = {};

export const ConnectedNamesColumn = connect(mapStateToProps, mapDispatchToProps)(NamesColumn);