import React, {Component} from 'react';
import * as Sentry from '@sentry/browser';

// Sentry.init({
//  dsn: "https://2d1ae3430ffb4da297d59d806f464f74@sentry.io/1406348"
// });
// should have been called before using it here
// ideally before even rendering your react app

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        if (this.props.user) {
            Sentry.configureScope(scope => {
                scope.setUser({
                    name: this.props.user.name,
                    email: this.props.user.email
                });
            })
        }
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
                <button onClick={() => Sentry.showReportDialog()}>Lütfen geri bildirimde bulunun</button>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
