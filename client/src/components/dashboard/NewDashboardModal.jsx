import React from 'react';
import { openSnackbarWithMessage } from '../../actions/snackbar';
import { createNewDashboard } from '../../actions/dashboard';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";


const NewDashboardModal = ({isOpen, setIsOpen, createNewDashboard, openSnackbarWithMessage, next}) => {
    // TODO: think about whether isOpen should be in store
    let history = useHistory();
    const [dashboardName, setDashboardName] = React.useState('');
    const createDashboard = () =>  {
        createNewDashboard(dashboardName)
        .then(newDashboardInfo => {
            if (next) {
                next(newDashboardInfo);
            } else {
                history.push(`/dashboard/${newDashboardInfo.id}`);
                closeDashboardDialog();
                openSnackbarWithMessage('Dashboard created succesfully!');
            }
        })
        .catch(error => {
            setDashboardName('');
            closeDashboardDialog();
            openSnackbarWithMessage(`${error}`);
        });
    };

    const closeDashboardDialog = () => {
        setIsOpen(false);
    }

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