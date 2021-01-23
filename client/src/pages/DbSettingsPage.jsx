import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { openSnackbarWithMessage } from '../actions/snackbar';
import { getDbCreds, setCurrentDbId } from '../actions/database';
// TODO: check if you can pull shared styles into form style
// TODO: put current db into query tool page?
// TODO: add validations to fields (port must be numeric)

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: '10px',
        width: '25ch',
        '& .MuiFormLabel-root': {
            color: 'black'
        },
        '& .MuiFormLabel-root.Mui-error': {
            color: '#f44336'
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
        '& .MuiFormLabel-root.Mui-error': {
            color: '#f44336'
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
        '& .MuiFormLabel-root.Mui-error': {
            color: '#f44336'
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
    buttonRoot: {
        backgroundColor: 'black',
        "&:hover": {
            backgroundColor: 'black'
        }
    },
    buttonLabel: {
        fontSize:'12px',
        textTransform: "none"
    },
    dbSelect: {
        width: '100%',
        fontSize: '16px',
        "& .MuiOutlinedInput-input": {
            padding: '10px'
        }
    },
    dbMenuItem: {
        fontSize: '16px'
    }
}));

export const DB_DISPLAY_NAME = 'displayName';
export const DB_TYPE = 'type';
export const DB_HOST = 'host';
export const DB_PORT = 'port';
export const DB_NAME = 'name';
export const DB_USERNAME = 'username';
export const DB_PASSWORD = 'password';
export const DB_REPLICA_OF = 'replicaOf';
export const DB_SSH_HOST = 'sshHost';
export const DB_SSH_USERNAME = 'sshUsername';
export const DB_SSH_PORT = 'sshPort';

const blankCredentials = {
    [DB_DISPLAY_NAME]: '',
    [DB_TYPE]: '',
    [DB_HOST]: '',
    [DB_PORT]: '',
    [DB_NAME]: '',
    [DB_USERNAME]: '',
    [DB_PASSWORD]: '',
    [DB_REPLICA_OF]: '',
    [DB_SSH_HOST]: '',
    [DB_SSH_USERNAME]: '',
    [DB_SSH_PORT]: ''
}

const formErrors = {
    [DB_DISPLAY_NAME]: false,
    [DB_TYPE]: false,
    [DB_HOST]: false,
    [DB_PORT]: false,
    [DB_NAME]: false,
    [DB_USERNAME]: false,
    [DB_PASSWORD]: false,
    [DB_REPLICA_OF]: false,
    [DB_SSH_HOST]: false,
    [DB_SSH_USERNAME]: false,
    [DB_SSH_PORT]: false
}

export const DbSettingsPage = ({dbCreds, getDbCreds, currentDbId, setCurrentDbId, openSnackbarWithMessage}) => {
    const classes = useStyles();
    const [form, setForm] = React.useState({...blankCredentials});

    const [errors, setErrors] = React.useState({...formErrors});
    
    React.useEffect(() => {
        getDbCreds()
        .catch(error => {
            openSnackbarWithMessage('Error retrieving database credentials.');
        })

    }, [getDbCreds, openSnackbarWithMessage]);

    React.useEffect(() => {
        const setFields = () => {
            if (currentDbId !== 'newDatabase') {
                const currentDbInfo = dbCreds.find(cred => cred.id === currentDbId);
                if (currentDbInfo) {
    
                    const {
                        database_type,
                        host,
                        name,
                        password,
                        port,
                        username
                    } = currentDbInfo;
    
                    setForm(prevState => ({
                        ...blankCredentials,
                        [DB_DISPLAY_NAME]: name,
                        [DB_TYPE]: database_type,
                        [DB_HOST]: host,
                        [DB_PORT]: port,
                        [DB_NAME]: name,
                        [DB_USERNAME]: username,
                        [DB_PASSWORD]: password
                    }));
                }
            } else {
                setForm({...blankCredentials});
            }
        }
    
        setFields();
    }, [currentDbId, dbCreds]);

    const validate = () => {
        let newErrors = {};
        if (!form[DB_DISPLAY_NAME].length) {
            newErrors[DB_DISPLAY_NAME] = true;
        };

        if (!form[DB_TYPE].length) {
            newErrors[DB_TYPE] = true;
        };

        if (!form[DB_HOST].length) {
            newErrors[DB_HOST] = true;
        };
        
        if (!form[DB_PORT] || isNaN(form[DB_PORT])) {
            newErrors[DB_PORT] = true;
        };

        if (!form[DB_NAME].length) {
            newErrors[DB_NAME] = true;
        };

        if (!form[DB_USERNAME].length) {
            newErrors[DB_USERNAME] = true;
        };

        if (!form[DB_PASSWORD].length) {
            newErrors[DB_PASSWORD] = true;
        };

        if (Object.keys(newErrors).length === 0) {
            return true;
        } else {
            setErrors({...formErrors, ...newErrors});
            return false;
        };

    }

    const submitDbCredentials = () => {
        if (validate()) {
            let data = form;
            if (currentDbId === 'newDatabase') {
                return fetch('/database/create', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.status === 201) {
                        return response.json();
                    } else {
                        throw new Error('Bad response from server.');
                    };
                })
                .then(data => {
                    getDbCreds()
                    .then(() => setCurrentDbId(data.id));
                    openSnackbarWithMessage('Database credentials submitted!');
                })
                .catch(error => {
                    openSnackbarWithMessage(`${error}`);
                });
            } else {
                data = {
                    ...data,
                    dbId: currentDbId
                }
                return fetch('/database/update', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.status === 200) {
                        getDbCreds();
                        openSnackbarWithMessage('Database credentials updated!');
                    } else {
                        throw new Error('Bad response from server.');
                    };
                })
                .catch(error => {
                    openSnackbarWithMessage(`${error}`);
                });
            }
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitDbCredentials();
    }

    return (
        <div style={{display: 'flex', justifyContent: 'left', margin:'30px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{width: '200px', marginBottom: '20px'}}>
                    <Select
                        className={classes.dbSelect}
                        id="dashboard-select"
                        variant='outlined'
                        value={currentDbId}
                        onChange={e => {
                            setCurrentDbId(e.target.value);
                        }}
                    >
                        <MenuItem className={classes.dbMenuItem} value={'newDatabase'}>New Database</MenuItem>
                        {dbCreds.map(cred => <MenuItem className={classes.dbMenuItem} key={cred.id} value={cred.id}>{cred.name}</MenuItem>)}
                    </Select>
                </div>
                <Paper style={{display: 'flex', flexDirection: 'row'}}>
                    <form onSubmit={handleSubmit} autoComplete="off" style={{margin: '10px'}}>
                        <div style={{margin: '10px'}}><Typography variant="h6" display="block">Credentials</Typography></div>
                        <div>
                            <TextField
                                id={DB_DISPLAY_NAME}
                                name={DB_DISPLAY_NAME}
                                value={form[DB_DISPLAY_NAME]}
                                error={errors[DB_DISPLAY_NAME]}
                                onChange={handleChange}
                                className={classes.textField}
                                label="Display Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControl
                                error={errors[DB_TYPE]}
                                className={classes.selectField}
                            >
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
                                error={errors[DB_HOST]}
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
                                error={errors[DB_PORT]}
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
                                error={errors[DB_NAME]}
                                onChange={handleChange}
                                className={classes.textField}
                                label="Database Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id={DB_USERNAME}
                                name={DB_USERNAME}
                                value={form[DB_USERNAME]}
                                error={errors[DB_USERNAME]}
                                onChange={handleChange}
                                className={classes.textField}
                                label="Database Username"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id={DB_PASSWORD}
                                name={DB_PASSWORD}
                                value={form[DB_PASSWORD]}
                                error={errors[DB_PASSWORD]}
                                onChange={handleChange}
                                className={classes.textField}
                                label="Database Password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        {/* <div>
                            <FormControl className={classes.selectField}>
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
                            />
                        </div> */}
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                style={{margin: '20px'}}
                                type='submit'
                                variant='contained'
                                color='primary'
                                disableRipple
                                classes={{
                                    root: classes.buttonRoot,
                                    label: classes.buttonLabel
                                }}
                                onClick={() => {
                                    
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                    <div style={{width: '400px'}}>
                        <div style={{margin: '20px'}}><Typography variant="h6" display="block">Status</Typography></div>
                        <div style={{margin: '8px', marginLeft: '20px', marginRight: '20px'}}><Typography variant="body2" display="block">Connection Healthy</Typography></div>
                        <div style={{margin: '8px', marginLeft: '20px', marginRight: '20px'}}><Typography variant="body2" display="block">Schemas Updated</Typography></div>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                style={{margin: '20px'}}
                                type='submit'
                                variant='contained'
                                color='primary'
                                disableRipple
                                classes={{
                                    root: classes.buttonRoot,
                                    label: classes.buttonLabel
                                }}
                            >
                                Disconnect Database
                            </Button>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    )
};

let mapStateToProps = state => {
    return {
        dbCreds: state.database.dbCreds,
        currentDbId: state.database.currentDbId || 'newDatabase'
    }
};

let mapDispatchToProps = {
    openSnackbarWithMessage,
    getDbCreds,
    setCurrentDbId
};


export const ConnectedDbSettingsPage = connect(mapStateToProps, mapDispatchToProps)(DbSettingsPage);