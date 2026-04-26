import React from 'react';
import Login from '../../Components/Auth/Login';
import Footer from '../../Components/Footer';
import { Helmet } from 'react-helmet';

const LoginPage = ({garage}) => {

    return (
        <>
            <Helmet>
                <title>Page Login</title>
            </Helmet>
            <Login />
            <Footer garage={garage} />
        </>
    );
};

export default LoginPage;

