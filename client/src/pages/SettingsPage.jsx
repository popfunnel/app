import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Input } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
  

export const SettingsPage = () => {
    const classes = useStyles();

    return (
        <div style={{display: 'flex', flex: '1', justifyContent: 'left', margin:'30px'}}>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        label="Standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
  
            </form>
        </div>
    )
};


  export default function BasicTextFields() {
    const classes = useStyles();
  
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>
    );
  }

let mapStateToProps = state => {
    return {
        
    }
};

let mapDispatchToProps;


export const ConnectedSettingsPage = connect(mapStateToProps, mapDispatchToProps)(SettingsPage);