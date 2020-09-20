import React from 'react';
import { connect } from 'react-redux'
import {setCurrentDashboard, refreshDashboardInfo, createNewDashboard, getCurrentDashboardId} from '../../../actions/dashboard';
import { openSnackbarWithMessage } from '../../../actions/snackbar';
import { saveChart, resetForm } from '../../../actions/queryTool';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: '24px'
    },
    inputBase: {
        height: '25px'
    }
}));

export const QueryToolHeader = ({currentDashboardId, refreshDashboardInfo, saveChart, openSnackbarWithMessage, rawResults, seriesType}) => {
    const classes = useStyles();
    let history = useHistory();
    const [chartName, setChartName] = React.useState('');
    const [chartNameHasError, setChartNameHasError] = React.useState(false);
    
    React.useEffect(() => {
        let fetchDashboardOptions = async () => {
            try {
                // TODO: should dashboard id be in chart url?
                await refreshDashboardInfo(currentDashboardId);
            } catch (error) {
                openSnackbarWithMessage(`${error}`);
            };
        };
        fetchDashboardOptions();
    }, [refreshDashboardInfo, openSnackbarWithMessage]);

    const validateChartName = () => {
        // TODO: ensure a chart has been created
        // TODO: support multiple snackbars
            // Reference: https://material-ui.com/components/snackbars/
        if (!chartName.length) {
            setChartNameHasError(true);
            openSnackbarWithMessage(`Chart Name cannot be empty.`);
            return false;
        } else if (!rawResults.length || seriesType === 'Table') {
            setChartNameHasError(true);
            openSnackbarWithMessage('Please create a chart before saving.');
        } else {
            return true;
        }
    };

    return (
        <div style={{height: '60px', boxShadow: '0 4px 5px -2px black', fontSize: '12px'}}>
            <div style={{height: '100%', display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>    
                    <div>[popfunnel demo] / Query Editor</div>
                    <InputBase
                        id='chart-name'
                        className={classes.inputBase}
                        label='Chart Name'
                        value={chartName}
                        placeholder='Untitled Chart'
                        onChange={e => {
                            setChartNameHasError(false);
                            setChartName(e.target.value)
                        }}
                        error={chartNameHasError}
                        inputProps={{
                            style: {
                                fontSize: '17px',
                                padding: '0px'
                            }
                        }}
                    />  
                </div>
                <div style={{marginRight: '24px'}}>
                    <Button
                        color='secondary'
                        onClick={() => {
                            resetForm();
                            history.push(`/dashboard/${currentDashboardId}`);
                        }}
                        disableRipple
                    >
                        Cancel
                    </Button>
                    <Button
                        color='secondary'
                        onClick={() => {
                            // TODO: prompt user to create a new dashboard if current is 'default'
                            if (validateChartName()) {
                                saveChart(chartName)
                                .then(() => {
                                    history.push(`/dashboard/${currentDashboardId}`);
                                })
                                .catch(error => {
                                    openSnackbarWithMessage(`${error}`);
                                });
                            }
                        }}
                        disableRipple
                        disabled={!chartName.length ? true : false}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentDashboardId: getCurrentDashboardId(state),
        rawResults: state.query.rawResults,
        seriesType: state.chart.seriesType
    };
};

const mapDispatchToProps = {
    openSnackbarWithMessage,
    saveChart,
    refreshDashboardInfo
};


export const ConnectedQueryToolHeader = connect(mapStateToProps, mapDispatchToProps)(QueryToolHeader);