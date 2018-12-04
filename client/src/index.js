import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './css/index.css';
import App from './App';
import {SnackbarProvider} from 'notistack';

render((
    <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
            <App/>
        </SnackbarProvider>
    </BrowserRouter>
), document.getElementById('root'));


