import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ColumnSelector } from './ColumnSelections';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import { setSeriesType, saveChartConfig, saveChart } from '../../../../actions/queryTool';
import {setCurrentDashboard, setDashboardOptions, createNewDashboard} from '../../../../actions/dashboard';

import { openSnackbarWithMessage } from '../../../../actions/snackbar';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    chartSelect: {
        width: '100%',
        fontSize: '12px'
    },
    chartSelectItem: {
        fontSize: '12px'
    }
}));


const SeriesSettings = ({seriesType, setSeriesType, rawQuery, queryResults, config, 
    saveChartConfig, saveChart, openSnackbarWithMessage}) => {
    const classes = useStyles();
    
    const StyledAccordion = withStyles({
        root: {
            backgroundColor:'inherit',
            border: 'none',
            boxShadow: 'none',
            '&:not(:last-child)': {
                borderBottom: 0,
            },
            '&:before': {
                display: 'none',
            },
            '&$expanded': {
                margin: 'auto',
            },
        },
        expanded: {},
    })(Accordion);

    // TODO: read about customization!!
    const StyledTextField = withStyles({
        root: {
            '& .MuiInputLabel-animated': {
                fontSize: '12px'
            },
            '& .MuiInputBase-input': {
                padding: '5px'
            }
        }
    })(TextField);
    
    let history = useHistory();

    // React.useEffect(() => {
    //     let fetchDashboardOptions = async () => {
    //         try {
    //             await setDashboardOptions();
    //         } catch (error) {
    //             openSnackbarWithMessage(`${error}`);
    //         };
    //     };
    //     fetchDashboardOptions();
    // }, [setDashboardOptions, openSnackbarWithMessage]);
    
    // const saveChart = () => {}
    
    // TODO: save button should be in a better location
    // TODO: snackbar after success or failure
    // TODO: add ability to render table inside dashboard page
    // TODO: force user to enter name for chart and add to chart config
        // TODO: maybe use this form dialog? https://material-ui.com/components/dialogs/
    return (
        <div style={{display:'flex', flexDirection: 'column', height: '100%'}}>
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
                {(queryResults.length > 0 && seriesType !== 'Table') &&
                <div style={{padding:'20px'}}>
                    <ColumnSelector/>
                </div> }
            </div>
            <div>
                <StyledAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Theme
                    </AccordionSummary>
                    <AccordionDetails>Theme options</AccordionDetails>
                </StyledAccordion>
                <StyledAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Series
                    </AccordionSummary>
                    <AccordionDetails>Series options</AccordionDetails>
                </StyledAccordion>
            </div>
            {(queryResults.length > 0 && seriesType !== 'Table') &&
            <div style={{display:'flex', flexDirection: 'column', justifyContent:'center'}}>
                <StyledTextField
                    // className={classes.chartNameTextField}
                    // value={dashboardName}
                    // onChange={e => setDashboardName(e.target.value)}
                    id="chart-name"
                    label="Chart Name"
                    // fullWidth
                />  
                <Button
                    color='secondary'
                    onClick={() => {
                        saveChart('userEnteredName')
                        .then(() => {
                            history.push('/dashboard')
                        })
                        .catch(error => {
                            openSnackbarWithMessage(`${error}`);
                        });
                    }}
                    disableRipple
                >
                    Save Chart
                </Button>
            </div>}
            
        </div>
    );
}

const mapStateToProps = state => {
    return {
        seriesType: state.chart.seriesType,
        rawQuery: state.query.userInput,
        queryResults: state.query.rawResults,
        config: state.chart.config
    };
}

const mapDispatchToProps = {
    setSeriesType,
    saveChartConfig,
    saveChart,
    openSnackbarWithMessage
};

export const ConnectedSeriesSettings = connect(mapStateToProps, mapDispatchToProps)(SeriesSettings);
