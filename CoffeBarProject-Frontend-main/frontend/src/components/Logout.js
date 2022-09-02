import {React, useEffect} from "react";
import { GoogleLogout } from 'react-google-login';
import { googleLogout } from '@react-oauth/google';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout({ setUser }) {
    const onSuccess = () => {
        googleLogout();  // helper for logging out
        setUser(null);
        localStorage.setItem("login", null);  // clearing local storage
        console.log('Logout made successfully');
    };

    const logoutFailure = (res) => {
        console.log('Logout failed: res:', res);
    }

    useEffect(()=>{
        function start()
        {
            gapi.client.init({
                clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope:""
            })
        }
        gapi.load('client:auth2',start)
    })

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                onFailure={logoutFailure}
            ></GoogleLogout>
        </div>
    )
}

export default Logout;