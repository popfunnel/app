import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// TODO: check if you can pull shared styles into form style
const useStyles = makeStyles((theme) => ({
    textField: {
        margin: '10px',
        width: '25ch',
        '& .MuiFormLabel-root': {
            color: 'black'
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'black',
        },
        '& 	.MuiInput-underline:after': {
           transitionDuration: '0ms',
        }
    },
    fullWidthField: {
        width: 'calc(100% - 20px)',
        margin: '10px',
        '& .MuiFormLabel-root': {
            color: 'black'
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'black',
        },
        '& 	.MuiInput-underline:after': {
            transitionDuration: '0ms',
        }
    },
    selectField: {
        margin: '10px',
        width: '25ch',
        '& .MuiFormLabel-root': {
            color: 'black'
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'black',
        },
        '& 	.MuiInput-underline:after': {
            transitionDuration: '0ms',
        }
    },
}));

export const DB_DISPLAY_NAME = 'displayName';
export const DB_TYPE = 'type';
export const DB_HOST = 'host';
export const DB_PORT = 'port';
export const DB_NAME = 'name';
export const DB_REPLICA_OF = 'replicaOf';
export const DB_SSH_HOST = 'sshHost';
export const DB_SSH_USERNAME = 'sshUsername';
export const DB_SSH_PORT = 'sshPort';

export const SettingsPage = () => {
    const classes = useStyles();

    const StyledSelect = withStyles((theme) => ({
        root: {
            fontSize: '15px',
        },
        outlined: {
            padding: '10px'
        }
    }))(Select);

    const [form, setForm] = React.useState({
        [DB_DISPLAY_NAME]: '',
        [DB_TYPE]: '',
        [DB_HOST]: '',
        [DB_PORT]: '',
        [DB_NAME]: '',
        [DB_REPLICA_OF]: '',
        [DB_SSH_HOST]: '',
        [DB_SSH_USERNAME]: '',
        [DB_SSH_PORT]: ''        
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div style={{display: 'flex', justifyContent: 'left', margin:'30px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{width: '200px', marginBottom: '20px'}}>
                    <StyledSelect
                        id="dashboard-select"
                        variant='outlined'
                        value={'newDatabase'}
                    >
                        <MenuItem value={'newDatabase'}>New Database</MenuItem>
                    </StyledSelect>
                </div>
                <Paper style={{display: 'flex', flexDirection: 'row'}}>
                    <form noValidate onSubmit={handleSubmit} autoComplete="off" style={{margin: '10px'}}>
                        <div style={{margin: '10px'}}><Typography variant="h6" display="block">Credentials</Typography></div>
                        <div>
                            <TextField
                                id={DB_DISPLAY_NAME}
                                name={DB_DISPLAY_NAME}
                                value={form[DB_DISPLAY_NAME]}
                                onChange={handleChange}
                                className={classes.textField}
                                label="Display Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControl className={classes.selectField}>
                                <InputLabel shrink>Database Type</InputLabel>
                                <Select
                                    id={DB_TYPE}
                                    name={DB_TYPE}
                                    value={form[DB_TYPE]}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={''}/>
                                    <MenuItem value={'redshift'}>Redshift</MenuItem>
                                    <MenuItem value={'postgres'}>Postgres</MenuItem>
                                    <MenuItem value={'mysql'}>MySQL</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <TextField
                                id={DB_HOST}
                                name={DB_HOST}
                                value={form[DB_HOST]}
                                onChange={handleChange}
                                className={classes.fullWidthField}
                                label="Database Host"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id={DB_PORT}
                                name={DB_PORT}
                                value={form[DB_PORT]}
                                onChange={handleChange}
                                className={classes.textField}
                                label="Database Port"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id={DB_NAME}
                                name={DB_NAME}
                                value={form[DB_NAME]}
                                onChange={handleChange}
                                className={classes.textField}
                                label="Database Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div>
                            <FormControl className={classes.selectField} disabled>
                                <InputLabel shrink>Replica Of</InputLabel>
                                <Select
                                    id={DB_REPLICA_OF}
                                    name={DB_REPLICA_OF}
                                    value={form[DB_REPLICA_OF]}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={''}>None</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <TextField
                                id={DB_SSH_HOST}
                                name={DB_SSH_HOST}
                                value={form[DB_SSH_HOST]}
                                onChange={handleChange}
                                className={classes.fullWidthField}
                                label="SSH Host"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled
                            />
                        </div>
                        <div>
                            <TextField
                                id={DB_SSH_USERNAME}
                                name={DB_SSH_USERNAME}
                                value={form[DB_SSH_USERNAME]}
                                onChange={handleChange}
                                className={classes.textField}
                                label="SSH Username"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled
                            />
                            <TextField
                                id={DB_SSH_PORT}
                                name={DB_SSH_PORT}
                                value={form[DB_SSH_PORT]}
                                onChange={handleChange}
                                className={classes.textField}
                                label="SSH Port"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled
                            />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                style={{margin: '10px'}}
                                type='submit'
                                variant='contained'
                                color='primary'
                                disableRipple
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                    <div style={{width: '400px'}}>
                        <div style={{margin: '20px'}}><Typography variant="h6" display="block">Status</Typography></div>
                        <div style={{margin: '8px', marginLeft: '20px', marginRight: '20px'}}><Typography variant="body2" display="block">Connection Healthy</Typography></div>
                        <div style={{margin: '8px', marginLeft: '20px', marginRight: '20px'}}><Typography variant="body2" display="block">Schemas Updated</Typography></div>
                    </div>
                </Paper>
            </div>
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