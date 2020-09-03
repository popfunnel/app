import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

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
                <Typography variant="h6">
                    popfunnel Login
                </Typography>
                <TextField id="standard-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                <TextField id="filled-basic" label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'10px'}}>
                    <div>
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
                    <div>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                redirectToRegisterPage()
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
