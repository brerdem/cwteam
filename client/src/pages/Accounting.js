import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import theme from "../components/styles/Styles";
import 'react-circular-progressbar/dist/styles.css';

class Accounting extends Component {
    state = {
        labelWidth: 0,
        loading: false

    };

    render() {
        const {classes} = this.props;

        return (

            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="primary"
                                className={classes.headingPadding}>
                        MUHASEBE
                    </Typography>

                    <Typography variant="h6" align="center" color="primary"
                                className={classes.headingPadding}>
                        Muhasebeyi ilgilendiren işlemler
                    </Typography>

                </div>

            </main>

        )
    }
}

Accounting.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Accounting);
