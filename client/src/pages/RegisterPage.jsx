import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom:'60px'
    },
    form: {
        display: 'flex',
        flexDirection:'column',
        padding: '20px'
    },
}));

export const RegisterPage = () => {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    const sendRegisterInfo = () => {
        const data = {
            email: email,
            username: username,
            password: password
        }

        fetch('/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => 
            console.log('here is the data', data)
        );
    };

    const redirectToLoginPage = () => {
        history.push('/login')
    }

    return (
        <div className={classes.root}>
            <form className={classes.form}>
                <Typography variant="h6">
                    Register for popfunnel
                </Typography>
                <TextField id="standard-basic" label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <TextField id="standard-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                <TextField id="filled-basic" label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'10px'}}>
                    <div>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                sendRegisterInfo();
                            }}
                            disableRipple
                        >
                            Register
                        </Button>
                    </div>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            redirectToLoginPage();
                        }}
                    >
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
        
    )
};
