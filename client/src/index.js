import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './css/index.css';
import App from './App';
import {SnackbarProvider} from 'notistack';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/tr';
import {Provider} from "react-redux";
import {store} from "./helpers/store";

moment.locale('tr');

render((
    <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
            <MuiPickersUtilsProvider utils={MomentUtils} locale="tr" moment={moment}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </MuiPickersUtilsProvider>
        </SnackbarProvider>
    </BrowserRouter>
), document.getElementById('root'));


