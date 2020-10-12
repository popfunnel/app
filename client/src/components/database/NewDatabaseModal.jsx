import React from 'react';
import { openSnackbarWithMessage } from '../../actions/snackbar';
import { setIsDatabaseModalOpenStatus } from '../../actions/database';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";



const NewDatabaseModal = ({isOpen, setIsDatabaseModalOpenStatus, openSnackbarWithMessage}) => {
    let history = useHistory();
    const handleClose = () => {
        setIsDatabaseModalOpenStatus(false);
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="database-form-dialog">
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="database-name"
                    label="Database Name"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = state => {
    return {
        isOpen: state.database.isModalOpen
    }
};

const mapDispatchToProps = {
    setIsDatabaseModalOpenStatus,
    openSnackbarWithMessage
}

export const ConnectedNewDatabaseModal = connect(mapStateToProps, mapDispatchToProps)(NewDatabaseModal);