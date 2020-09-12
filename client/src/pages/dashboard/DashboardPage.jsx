import React from 'react';
import { ConnectedDashboard } from  '../../components/dashboard/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {setCurrentDashboard} from '../../actions/dashboard';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// const useStyles = makeStyles((theme) => ({
//     addDashboard: {
//         backgroundColor: '#000000',
//         flex:'1',
//         padding: '0px',
//     }
// }));

export const DashboardPage = ({currentDashboard, setCurrentDashboard, dashboards}) => {
    // const classes = useStyles();
    let history = useHistory();
    // const [currentDashboard, setCurrentDashboard] = React.useState('example-dashboard1')
    // const [dashboardOptions, setDashboardOptions] = React.useState()
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
    
    
    const handleAddChart = () => {
        history.push('/queryTool');
    };
    
    // const getDashboardList = () => {
    //     fetch('/dashboard')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('data', data);
    //     })
    // };

    // React.useEffect(() => {
    //     getDashboardList()
    // }, [])
    
    const openDashboardDialog = () => {
        setIsDashboardDialogOpen(true);
    };
    
    const closeDashboardDialog = () => {
        setIsDashboardDialogOpen(false);
    };
    
    return (
        <div style={{height:'100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%', padding:'10px'}}>
                <div style={{display:'flex'}}>
                    <StyledSelect
                        id="dashboard-select"
                        value={currentDashboard}
                        onChange={e => {setCurrentDashboard(e.target.value)}}
                        variant='outlined'
                    >
                        {dashboards.map(dashboard => {
                            return (
                                <MenuItem key={uuidv4()} value={dashboard}>{dashboard}</MenuItem>        
                            );
                        })}
                        {/* <MenuItem value={'example-dashboard1'}>very-long-dashboard-name</MenuItem>
                        <MenuItem value={'example-dashboard2'}>shorter-dashboard-name</MenuItem> */}
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
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {handleAddChart()}}
                    endIcon={<AddIcon/>}
                    disableRipple
                >
                    Add chart
                </Button>
            </div>
            <ConnectedDashboard/>
            <Dialog open={isDashboardDialogOpen} onClose={closeDashboardDialog} aria-labelledby="dashboard-form-dialog">
                {/* <DialogTitle id="dashboard-form-dialog-title">New Dashboard</DialogTitle> */}
                <DialogContent>
                    {/* <DialogContentText>
                        Enter a unique name:
                    </DialogContentText> */}
                    <TextField
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
                    <Button onClick={closeDashboardDialog} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currentDashboard: state.dashboard.currentDashboard,
        dashboards: state.dashboard.dashboards
    }
}

const mapDispatchToProps = {
    setCurrentDashboard
};

export const ConnectedDashboardPage = connect(mapStateToProps, mapDispatchToProps)(DashboardPage);