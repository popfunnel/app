import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux'

import { updateYAndChartConfig } from '../../../../actions/queryTool';


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

const YSelections = ({columnNames, columnSelections, updateYAndChartConfig}) => {
    const classes = useStyles();

    const handleChange = (event) => {
        updateYAndChartConfig(event.target.name, event.target.checked);
    };

    return (
        <div>
            <FormControl required component="fieldset" className={classes.formControl}>
                <div><FormLabel className={classes.formLabelHeader} component="legend">Y Axis</FormLabel></div>
                <FormGroup>
                    {columnNames.map(name => {
                        let checked = columnSelections.byColumnName[name].yAxis;
                        return <Checkbox key={name} checked={checked} onChange={handleChange} name={name} />
                    })}
                </FormGroup>
            </FormControl>
        </div>
    );
};

const mapStateToProps = (state) => {
    let columnSelections = state.chart.columnSelections;

    return {
        columnNames: columnSelections.columnNames,
        columnSelections
    }
}

const mapDispatchToProps = {
    updateYAndChartConfig
};

export const ConnectedYSelections = connect(mapStateToProps, mapDispatchToProps)(YSelections);