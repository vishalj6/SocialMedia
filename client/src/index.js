import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthContextProvider } from './context/authContext';
import { AuthProvider } from 'react-auth-kit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <DarkModeContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </DarkModeContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
