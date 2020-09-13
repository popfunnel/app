import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { openSnackbarWithMessage } from '../actions/snackbar';

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
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState({
        usernameTextField: false,
        passwordTextField: false,
    });

    const EMAIL_TEXT_FIELD = 'emailTextField';
    const PASSWORD_TEXT_FIELD = 'passwordTextField';

    const validate = () => {
        let newErrors = {};
        if (!email.length) {
            newErrors[EMAIL_TEXT_FIELD] = true;
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

    const sendRegisterInfo = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        if (validate()) {
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
                    dispatch(openSnackbarWithMessage('Registration successful!'));
                    history.push('/login');
                } else if (response.status === 400 || response.status === 500) {
                    dispatch(openSnackbarWithMessage("An error occurred..."))
                    return false;
                };
                return response.json()
            })
            .then(responseMsg => {
                console.log(responseMsg);
            });
            return true;
        } else {
            return false;
        }
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
                <TextField disabled={true} id={EMAIL_TEXT_FIELD} label="Email" value={email} onChange={e => setEmail(e.target.value)} error={errors[EMAIL_TEXT_FIELD]} autoComplete="on"/>
                <TextField disabled={true} id={PASSWORD_TEXT_FIELD} label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} error={errors[PASSWORD_TEXT_FIELD]} autoComplete="on"/>
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