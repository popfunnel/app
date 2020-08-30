import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom:'50px'
    },
    form: {
        display: 'flex',
        flexDirection:'column',
        padding: '20px'
    },
    // title: {
    //     height:'20px'
    // }
}));

export const LoginPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <form className={classes.form}>
                <Typography variant="h6" className={classes.title}>
                    Popfunnel Login
                </Typography>
                <TextField id="standard-basic" label="Username"/>
                <TextField id="filled-basic" label="Password" type='password'/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'10px'}}>
                    <div>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                            }}
                            disableRipple
                        >
                            Login
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                            }}
                            disableRipple
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </form>
        </div>
        
    )
};
