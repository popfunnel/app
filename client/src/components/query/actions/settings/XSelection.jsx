import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { connect } from 'react-redux'
import { updateXSelection } from '../../../../actions/queryTool';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '5px',
    },
    formLabelHeader: {
        fontSize: '12px',
        minHeight: '20px'
    },
    formLabel: {
        display: 'flex',
        justifyContent: 'flexStart',
        alignItems:'center',
        fontSize: '12px',
        minHeight:'42px'
    }
}));

const XSelection = ({columnNames, xSelection, updateXSelection}) => {
    const classes = useStyles();

    const handleChange = (event) => {
        updateXSelection(event.target.value);
    };

    return (
        <div>
            <FormControl required component="fieldset" className={classes.formControl}>
                <div><FormLabel className={classes.formLabelHeader} component="legend">X Axis</FormLabel></div>
                <RadioGroup aria-label="column_name" value={xSelection} onChange={handleChange}>
                    {columnNames.map(name => {
                        return <Radio key={name} value={name} />
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

const mapStateToProps = (state) => {
    let selections = state.chart.columnSelections;
    let xSelection = selections.columnNames.filter(name => {
        return selections.byColumnName[name].xAxis === true
    })
    xSelection = xSelection.length ? xSelection[0] : '';

    return {
        columnNames: selections.columnNames,
        xSelection
    }
}

const mapDispatchToProps = {
    updateXSelection
};

export const ConnectedXSelection = connect(mapStateToProps, mapDispatchToProps)(XSelection);