import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MetaMaskProvider } from '@metamask/sdk-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
        <MetaMaskProvider debug={false} sdkOptions={{
          logging:{
              developerMode: false,
            },
            communicationServerUrl: process.env.REACT_APP_COMM_SERVER_URL,
            checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
            dappMetadata: {
              name: "bgreen-template",
              url: window.location.host,
            }
        }}>
          <App />
        </MetaMaskProvider>
    </BrowserRouter>
  </React.StrictMode>
);
