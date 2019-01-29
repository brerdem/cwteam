import React from 'react';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

function withLoading(Component) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return (<Component {...props} />);
        return (<CircularProgress color="secondary"/>);
    }
}
export default withLoading;
