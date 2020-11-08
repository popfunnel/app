import React from 'react';
import { connect } from 'react-redux'
import {refreshDashboardInfo } from '../../../actions/dashboard';
import { openSnackbarWithMessage } from '../../../actions/snackbar';
import { setChartName } from '../../../actions/queryTool';
import { saveChart, resetForm } from '../../../actions/queryTool';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import { ConnectedNewDashboardModal } from  '../../../components/dashboard/NewDashboardModal';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: '24px'
    },
    inputBase: {
        height: '25px'
    }
}));

export const QueryToolHeader = ({currentDashboardInfo, refreshDashboardInfo, saveChart,
    openSnackbarWithMessage, rawResults, seriesType, chartName, setChartName}) => {

    const classes = useStyles();
    let history = useHistory();
    // const [chartName, setChartName] = React.useState('');
    const [chartNameHasError, setChartNameHasError] = React.useState(false);
    const [isDashboardDialogOpen, setIsDashboardDialogOpen] = React.useState(false);

    let {
        id: currentDashboardId,
        name: currentDashboardName
    } = currentDashboardInfo;

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
    }, [refreshDashboardInfo, openSnackbarWithMessage, currentDashboardId]);

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

    const getPathName = () => {
        let dashboardName;
        if (!currentDashboardName.length) {
            dashboardName = 'No Dashboard';
        } else {
            dashboardName = currentDashboardName;
        }

        let chartPathName;
        if (!chartName.length) {
            chartPathName = 'Untitled Chart';
        } else {
            chartPathName = chartName;
        };

        return `[popfunnel demo] / ${dashboardName} / ${chartPathName}`
    }

    // TODO: use async/await?
    const newDashboardCallback = newDashboardInfo => {
        saveChart(chartName, newDashboardInfo.id)
        .then(() => {
            // TODO: this needs to have the dashboardname in
            history.push(`/dashboard/${newDashboardInfo.id}/${newDashboardInfo.name}`);
        }).catch(error => {
            openSnackbarWithMessage(`${error}`);
        })
    };

    return (
        <div style={{height: '60px', boxShadow: '0 4px 5px -2px black', fontSize: '12px'}}>
            <div style={{height: '100%', display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>    
                    <div>{getPathName()}</div>
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
                            history.push(`/dashboard/${currentDashboardId}/${currentDashboardName}`);
                        }}
                        disableRipple
                    >
                        Cancel
                    </Button>
                    <Button
                        color='secondary'
                        onClick={() => {
                            if (validateChartName()) {
                                if (currentDashboardId === 'default') {
                                    setIsDashboardDialogOpen(true);
                                } else {
                                    saveChart(chartName)
                                    .then(() => {
                                        history.push(`/dashboard/${currentDashboardId}/${currentDashboardName}`);
                                    })
                                    .catch(error => {
                                        openSnackbarWithMessage(`${error}`);
                                    });
                                }
                            }
                        }}
                        disableRipple
                        disabled={!chartName.length}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <ConnectedNewDashboardModal
                isOpen={isDashboardDialogOpen}
                setIsOpen={setIsDashboardDialogOpen}
                next={newDashboardCallback}
            />
        </div>
    );
}

const mapStateToProps = state => {
    console.log('state.chart.name', state.chart)
    return {
        currentDashboardInfo: state.dashboard.currentDashboard,
        rawResults: state.query.rawResults,
        seriesType: state.chart.seriesType,
        chartName: state.chart.name
    };
};

const mapDispatchToProps = {
    openSnackbarWithMessage,
    saveChart,
    refreshDashboardInfo,
    setChartName
};


export const ConnectedQueryToolHeader = connect(mapStateToProps, mapDispatchToProps)(QueryToolHeader);
