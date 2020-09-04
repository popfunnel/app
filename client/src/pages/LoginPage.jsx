import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        display: 'flex',
        flexDirection:'column',
        padding: '20px'
    },
}));

export const LoginPage = () => {
    const classes = useStyles();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useHistory();

    const sendLoginInfo = () => {
        const data = {
            username: username,
            password: password
        }

        fetch('/user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200) {
                console.log('You logged in!!!');
                history.push('/');
            } else if (response.status === 400) {
                alert('Those credentials did not work');
            }
        })
    };

    const redirectToRegisterPage = () => {
        history.push('/register');
    }

    return (
        <div className={classes.root}>
            <form className={classes.form}>
                <div style={{margin: '20px'}}>
                    <Typography variant="h2">
                        popfunnel
                    </Typography>
                </div>
                <TextField id="standard-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                <TextField id="filled-basic" label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                <div style={{marginTop: '10px'}}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            sendLoginInfo()
                        }}
                        disableRipple
                    >
                        Login
                    </Button>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100px'}}>
                    <div>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                redirectToRegisterPage();
                            }}
                        >
                            Click here to register.
                        </Link>
                    </div>
                </div>
            </form>
        </div>
        
    )
};
