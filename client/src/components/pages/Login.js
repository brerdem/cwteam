import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/es/CssBaseline/CssBaseline";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Paper from "@material-ui/core/es/Paper/Paper";
import team from '../../img/team.png'
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import {Link} from "react-router-dom";
import axios from "axios/index";
import {compose} from 'recompose';
import {reduxForm} from 'redux-form';
import Field from "redux-form/es/Field";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        width: 70,
        height: 70
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
)

class Login extends Component {

    showMessage = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
            variant: variant
        })
    };

    handleSubmit = e => {
        e.preventDefault();

        axios.post('/api/auth/login', {
            email: e.target.email.value,
            password: e.target.password.value

        })
            .then((response) => {
                if (response.statusText === "OK") {
                    //console.log(response.data.token);
                    this.handleLogin(response.data.user, response.data.token.toString())

                }

            })
            .catch((error) => {
                let errStr;
                console.log(error);
                errStr = error.response.data.code === 11000 ? 'Bu kullanıcı mevcut' : 'Bilinmeyen hata';
                this.showMessage(errStr, 'error');
            });

    };

    handleLogin = (user, token) => {
        console.log(this.props);
        this.props.doLogin(user, token);
        this.props.history.push('/');
    };

    render() {

        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar} src={team}/>


                    <Typography component="h1" variant="h5">
                        Giriş Yap
                    </Typography>
                    <Typography component="p" variant="body2">
                        veya
                    </Typography>
                    <Link to={'/register'}>
                        <Typography component="p" variant="body2" color="primary">
                            Kaydol
                        </Typography>
                    </Link>
                    <form className={classes.form} onSubmit={this.handleSubmit}>

                        <Field component={renderTextField} hintText="Mail" label="E-mail Adresi" name="email" />

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Şifre</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"/>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Beni hatırla"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            GİRİŞ
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default compose(
    withStyles(styles),
    reduxForm({form: 'loginForm'})
)(Login);

