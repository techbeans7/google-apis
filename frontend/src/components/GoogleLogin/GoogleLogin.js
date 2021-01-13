import React, {useState, useContext} from 'react';
import GoogleLogin from 'react-google-login';
import * as AuthService from '../../services/AuthService';
import {AuthContext} from '../../context/AuthContext';
import Message from '../Message';

import './googleLogin.css';

const Login = (props)=>{
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const authContext = useContext(AuthContext);
   
    const responseGoogle = async (response) => {
        try {
            if (response['code']) {
                const result = await AuthService.login(response['code']);
                const {status, message, data} = result;
                if (status=='success'){
                    authContext.setUser(data);
                    authContext.setIsAuthenticated(true);
                    props.history.push('/');
                }
                else {
                    setStatus(status);
                    setMessage(message);
                }
            } else {
                throw new Error(response);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    
    return (
        <div className="login-page">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                responseType="code"
                redirectUri="postmessage"
                scope="https://www.googleapis.com/auth/contacts.readonly"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
        />
        <br/>
        {message ? <Message status={status} message={message}/> : null}
        </div>
    )
}

export default Login;
