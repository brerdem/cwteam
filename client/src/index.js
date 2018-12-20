import React from 'react';
import {render} from 'react-dom';
import './css/index.css';
import App from './App';
import {SnackbarProvider} from 'notistack';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/tr';
import {Provider} from "react-redux";
import {store} from "./helpers/store";
import {ConnectedRouter} from "connected-react-router";
import history from './helpers/history';
import {getToken} from "./actions/auth";
import {AUTH_AUTHENTICATED} from "./actions/types";

moment.locale('tr');


const token = getToken();
if (token) {
    store.dispatch({ type: AUTH_AUTHENTICATED });
}




render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <SnackbarProvider maxSnack={3}>
                <MuiPickersUtilsProvider utils={MomentUtils} locale="tr" moment={moment}>

                    <App/>

                </MuiPickersUtilsProvider>
            </SnackbarProvider>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));


