import React from 'react';
import { openSnackbarWithMessage } from '../../actions/snackbar';
import { createNewDashboard } from '../../actions/dashboard';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

const NewDashboardModal = ({isOpen, createNewDashboar, openSnackbarWithMessage}) => {
    // TODO: think about whehter isOpen should be in store
    const [dashboardName, setDashboardName] = React.useState('');
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

    return (
        <Dialog open={isOpen} onClose={closeDashboardDialog} aria-labelledby="dashboard-form-dialog">
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
    );
};

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = {
    createNewDashboard,
    openSnackbarWithMessage
}

export const ConnectedNewDashboardModal = connect(mapStateToProps, mapDispatchToProps)(NewDashboardModal);