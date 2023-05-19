import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getUnit } from '../utils';
import Loading from '../pages/Loading';

function SSOCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        const cookies = new Cookies()
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code === null) {
            navigate("/")
            return
        }

        const clientId = 'console';
        const redirectUri = `${window.location.origin}/oauth2/token`;

        const data = new URLSearchParams();
        data.append('grant_type', 'authorization_code');
        data.append('code', code);
        data.append('client_id', clientId);
        data.append('redirect_uri', redirectUri);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        axios.post(`https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/token`, data, config)
            .then(response => {
                if (response.status === 200) {
                    const cookies = new Cookies()
                    const { access_token, expires_in, id_token, refresh_expires_in, refresh_token } = response.data;

                    cookies.set("access_token", access_token, {
                        path: "/",
                        maxAge: expires_in,
                    })

                    cookies.set("id_token", id_token, {
                        path: "/"
                    })
                    cookies.set("refresh_token", refresh_token, {
                        path: "/",
                        maxAge: refresh_expires_in
                    })

                    navigate("/");
                }
            })
            .catch(error => {
                cookies.remove("access_token")
                cookies.remove("id_token")
                cookies.remove("refresh_token")
                navigate("/")
            });
    }, [navigate]);

    return <Loading title='Proccessing SSO Callback...' />;
}

export default SSOCallback