import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { closeSnackbar } from '../../actions/snackbar';

const CustomSnackbar = ({isOpen, message, closeSnackbar}) => {
    const handleErrorSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        closeSnackbar();
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={isOpen}
            autoHideDuration={6000}
            onClose={handleErrorSnackbarClose}
            message={message}
            action={
                <>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleErrorSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    )

}

const mapStateToProps = state => {
    const {isOpen, message} = state.snackbar;

    return {
        isOpen,
        message
    }
}

const mapDispatchToProps = {
    closeSnackbar
};

export const ConnectedCustomSnackbar = connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);
