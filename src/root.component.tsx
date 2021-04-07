import { Auth0Provider } from '@auth0/auth0-react';
import React, { lazy } from 'react';
import SecondPage from './SecondPage';

export default function Root(props) {
  return (
    <Auth0Provider
      domain="insurwave-poc.eu.auth0.com"
      clientId="VASlRGR7UJr6z3sdk20aHRWXgJ0WDPj6"
      redirectUri={`${window.location.origin}/login-callback`}
      audience="https://api.iwnonprod.com"
      scope="read:current_user update:current_user_metadata"
      // useRefreshTokens={true}
    >
      <SecondPage />
    </Auth0Provider>
  );
}
