import React from 'react';
import { ConnectedDashboard } from  '../../components/dashboard/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {setCurrentDashboard, refreshDashboardInfo, createNewDashboard} from '../../actions/dashboard';
import {openSnackbarWithMessage} from '../../actions/snackbar';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SaveIcon from '@material-ui/icons/Save';

export const DashboardPage = ({currentDashboardId, setCurrentDashboard, currentDashboardLayout, refreshDashboardInfo, createNewDashboard,
    openSnackbarWithMessage, dashboardOptions}) => {
        
    let history = useHistory();
    // TODO: read about MUI component customization
    // https://material-ui.com/customization/components/
    const StyledSelect = withStyles((theme) => ({
        root: {
            fontSize: '15px',
        },
        outlined: {
            padding: '10px'
        }
    }))(Select);
    const [isDashboardDialogOpen, setIsDashboardDialogOpen] = React.useState(false);
    const [dashboardName, setDashboardName] = React.useState('');
    const [currentLayout, setCurrentLayout] = React.useState(currentDashboardLayout);
    // TODO: read about async effects: https://www.robinwieruch.de/react-hooks-fetch-data
    // TODO: fine for now
    React.useEffect(() => {
        let fetchDashboardOptions = async () => {
            try {
                await refreshDashboardInfo();
            } catch (error) {
                openSnackbarWithMessage(`${error}`);
            };
        };
        fetchDashboardOptions();
    }, [refreshDashboardInfo, openSnackbarWithMessage]);
    
    const handleAddChart = () => {
        history.push('/queryTool');
    };

    const openDashboardDialog = () => {
        setIsDashboardDialogOpen(true);
    };
    
    const closeDashboardDialog = () => {
        setIsDashboardDialogOpen(false);
    };

    const createDashboard = () =>  {
        // TODO: add validation on entered dashboardname
        createNewDashboard(dashboardName)
        .then(() => {
            setDashboardName('');
            closeDashboardDialog();
            openSnackbarWithMessage('Dashboard created succesfully!');
        })
        .catch(error => {
            setDashboardName('');
            closeDashboardDialog();
            openSnackbarWithMessage(`${error}`);
        });
    };

    const getDashboardMenuItems = () => {
        let dashboardMenuItems = dashboardOptions.map(dashboard => {
            return (
                <MenuItem key={uuidv4()} id={dashboard.id} value={dashboard.id}>{dashboard.name}</MenuItem>        
            );
        });
        if (!dashboardMenuItems.length) {
            dashboardMenuItems.push( <MenuItem key={uuidv4()} id={'no-dashboards-option'} value={'no-dashboards-option'}>No dashboards available.</MenuItem>)
        };
        
        return dashboardMenuItems;
    };

    // TODO: save functionality is duplicated in connecteddashboard component,
    // move to action?
    const saveChartLayout = () => {
        let data = {
            dashboard_id: currentDashboardId,
            chartLayout: currentLayout
        }

        return fetch('/dashboard/update-layout', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200) {
                openSnackbarWithMessage('Chart layout saved!');
                return refreshDashboardInfo();
            } else if (response.status === 500 || response.status === 400) {
                openSnackbarWithMessage('Bad response from server.');
                return false;
            }
        })
        .catch(error => {
            openSnackbarWithMessage(`${error}`);
        });
    }

    return (
        <div style={{height:'100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%', padding:'10px'}}>
                <div style={{display:'flex'}}>
                    <StyledSelect
                        id="dashboard-select"
                        value={currentDashboardId}
                        onChange={e => {
                            setCurrentDashboard(e.target.value)
                        }}
                        variant='outlined'
                    >
                        {getDashboardMenuItems()}
                    </StyledSelect>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {openDashboardDialog()}}
                        disableRipple
                    >
                        <AddIcon/>
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {handleAddChart()}}
                        endIcon={<AddIcon/>}
                        disableRipple
                    >
                        Add chart
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {saveChartLayout()}}
                        endIcon={<SaveIcon/>}
                        disableRipple
                    >
                        Save
                    </Button>
                </div>
            </div>
            <ConnectedDashboard currentLayout={currentLayout} setCurrentLayout={setCurrentLayout}/>
            <Dialog open={isDashboardDialogOpen} onClose={closeDashboardDialog} aria-labelledby="dashboard-form-dialog">
                <DialogContent>
                    <TextField
                        value={dashboardName}
                        onChange={e => setDashboardName(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="dashboard-name"
                        label="Dashboard Name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDashboardDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createDashboard} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currentDashboardId: state.dashboard.currentDashboard.id,
        currentDashboardLayout: state.dashboard.currentDashboard.chart_layout || [],
        dashboardOptions: state.dashboard.dashboardOptions
    }
}

const mapDispatchToProps = {
    setCurrentDashboard,
    createNewDashboard,
    openSnackbarWithMessage,
    refreshDashboardInfo
};

export const ConnectedDashboardPage = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);