import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export const LogoutPage = () => {
    React.useEffect(() => {
        let jwtHeaderPayload = Cookies.get('jwtHeaderPayload');
        if (jwtHeaderPayload) {
            Cookies.remove('jwtHeaderPayload');
        }
    }, []);

    return (
        <Redirect to='/login'/>
    );
};