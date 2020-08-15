import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ColumnSelector } from './ColumnSelections';

import { makeStyles } from '@material-ui/core/styles';

import { setSeriesType } from '../../../../actions/queryTool';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    chartSelect: {
        width: '100%',
        fontSize: '12px'
    },
    chartSelectItem: {
        fontSize: '12px'
    }
}));

const SeriesSettings = ({seriesType, setSeriesType}) => {
    const classes = useStyles();

    return (
        <div styles={{display:'flex', flexDirection: 'column', width:'100%'}}>
            <Typography variant="overline" display="block" gutterBottom>
                Series Settings
            </Typography>
            <>
                <Select
                    className={classes.chartSelect}
                    value={seriesType}
                    onChange={(e) => {
                        setSeriesType(e.target.value)}}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem className={classes.chartSelectItem} value={'Table'}>Table</MenuItem>
                    <MenuItem className={classes.chartSelectItem} value={'Bar'}>Bar</MenuItem>
                    <MenuItem className={classes.chartSelectItem} value={'Line'}>Line</MenuItem>
                </Select>
            </>
            <div style={{display:'flex', justifyContent:'center'}}>
                <ColumnSelector/>
            </div>
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Theme
                    </AccordionSummary>
                    <AccordionDetails>Theme options</AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Series
                    </AccordionSummary>
                    <AccordionDetails>Series options</AccordionDetails>
                </Accordion>
            </div>

        </div>
    );
}


const mapStateToProps = state => {
    return {
        seriesType: state.chart.seriesType
    };
}

const mapDispatchToProps = {
    setSeriesType
};

export const ConnectedSeriesSettings = connect(mapStateToProps, mapDispatchToProps)(SeriesSettings);
