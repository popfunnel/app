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
        alignItems: 'center'
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
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    const sendRegisterInfo = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }

        fetch('/user/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200) {
                history.push('/login');
            } else if (response.status === 400) {
                alert('There was an error');
            }
            return response.json()
        })
        .then(responseMsg => {
            console.log(responseMsg);
        });
    };

    const redirectToLoginPage = () => {
        history.push('/login')
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={sendRegisterInfo}>
                <Typography variant="h6">
                    Register for popfunnel
                </Typography>
                <TextField id="standard-basic" label="Email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="on"/>
                <TextField id="filled-basic" label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} autoComplete="on"/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'10px'}}>
                    <div>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
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
    );
};