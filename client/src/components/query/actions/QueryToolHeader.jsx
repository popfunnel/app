import React from 'react';
import { connect } from 'react-redux'
import {refreshDashboardInfo } from '../../../actions/dashboard';
import { openSnackbarWithMessage } from '../../../actions/snackbar';
import { setChartName } from '../../../actions/queryTool';
import { saveChart, resetForm } from '../../../actions/queryTool';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { ConnectedNewDashboardModal } from  '../../../components/dashboard/NewDashboardModal';

import { EditableChartTitle } from '../input/EditableChartTitle'

export const QueryToolHeader = ({currentDashboardInfo, refreshDashboardInfo, saveChart,
    openSnackbarWithMessage, rawResults, seriesType, chartName, setChartName, resetForm}) => {

    let history = useHistory();

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

    const newDashboardCallback = newDashboardInfo => {
        saveChart(chartName, newDashboardInfo.id)
        .then(() => {
            history.push(`/dashboard/${newDashboardInfo.id}/${newDashboardInfo.name}`);
            resetForm();
        }).catch(error => {
            openSnackbarWithMessage(`${error}`);
        })
    };

    return (
        <div style={{height: '60px', boxShadow: '0 4px 5px -2px black', fontSize: '12px'}}>
            <div style={{height: '100%', display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>    
                    <div>{getPathName()}</div>
                    <EditableChartTitle
                        handleChange={e => {
                            setChartNameHasError(false);
                            setChartName(e.target.value)
                        }}
                        error={chartNameHasError}
                        value={chartName}
                        placeholder={'Untitled Chart'}
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
                                        resetForm();
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
    resetForm,
    refreshDashboardInfo,
    setChartName
};


export const ConnectedQueryToolHeader = connect(mapStateToProps, mapDispatchToProps)(QueryToolHeader);
