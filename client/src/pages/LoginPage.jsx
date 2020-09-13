import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';
import { openSnackbarWithMessage } from '../actions/snackbar';
import { setUsername as setUsernameInStore } from '../actions/user';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    form: {
        display: 'flex',
        flexDirection:'column',
        padding: '20px'
    },
}));

export const LoginPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState({
        usernameTextField: false,
        passwordTextField: false,
    });

    const USERNAME_TEXT_FIELD = 'usernameTextField';
    const PASSWORD_TEXT_FIELD = 'passwordTextField';

    const validate = () => {
        let newErrors = {};
        if (!username.length) {
            newErrors[USERNAME_TEXT_FIELD] = true;
        };

        if (!password.length) {
            newErrors[PASSWORD_TEXT_FIELD] = true;
        };

        if (Object.keys(newErrors).length === 0) {
            return true;
        } else {
            setErrors(prevState => {
                return {...prevState, ...newErrors};
            });
            return false;
        };
    };
    
    // Reference: https://reactjs.org/docs/forms.html
    const sendLoginInfo = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
        console.log('enter!!')
        if (validate()) {
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
                    dispatch(setUsernameInStore(username));
                    dispatch(openSnackbarWithMessage('Login Successful!'));
                    history.push('/info');
                } else if (response.status === 400) {
                    dispatch(openSnackbarWithMessage('Invalid Credentials.'));
                    return false;
                } else if (response.status === 500) {
                    dispatch(openSnackbarWithMessage('Bad response from server.'));
                    return false;
                }
            });
        } else {
            return false;
        }
    };

    const redirectToRegisterPage = () => {
        // history.push('/register');
        dispatch(openSnackbarWithMessage("Unfortunately, you can't register for popfunnel right now."));
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={sendLoginInfo}>
                <div style={{margin: '20px'}}>
                    <Typography variant="h2">
                        popfunnel
                    </Typography>
                </div>
                <TextField id={USERNAME_TEXT_FIELD} label="Username" value={username} onChange={e => setUsername(e.target.value)} error={errors[USERNAME_TEXT_FIELD]} autoComplete="on"/>
                <TextField id={PASSWORD_TEXT_FIELD} label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} error={errors[PASSWORD_TEXT_FIELD]} autoComplete="on"/>
                <div style={{marginTop: '10px'}}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disableRipple
                    >
                        Login
                    </Button>
                </div>
            </form>
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
        </div>
    );
};
