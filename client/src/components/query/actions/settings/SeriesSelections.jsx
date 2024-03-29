import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux'
import { updateSeriesAndChartConfig } from '../../../../actions/queryTool';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'row'
    },
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

const SeriesSelections = ({columnNames, columnSelections, updateSeriesAndChartConfig}) => {
    const classes = useStyles();

    const handleChange = (event) => {
        updateSeriesAndChartConfig(event.target.name, event.target.checked);
    };

    return (
        <div>
            <FormControl required component="fieldset" className={classes.formControl}>
                <div><FormLabel className={classes.formLabelHeader} component="legend">Series</FormLabel></div>
                <FormGroup>
                    {columnNames.map(name => {
                        let checked = columnSelections.byColumnName[name].series;
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
    updateSeriesAndChartConfig
};

export const ConnectedSeriesSelections = connect(mapStateToProps, mapDispatchToProps)(SeriesSelections);