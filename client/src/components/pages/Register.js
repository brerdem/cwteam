import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/es/CssBaseline/CssBaseline";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";
import Paper from "@material-ui/core/es/Paper/Paper";
import team from '../../img/team.png'
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import axios from 'axios';
import {withSnackbar} from 'notistack';
import {compose} from 'recompose';

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


class Register extends Component {


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
        console.log(e.target.first_name.value);

        axios.post('/api/auth/register', {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            password: e.target.password.value

        })
            .then((response) => {
                if (response.data) {
                    this.showMessage("Başarıyla Üye Oldunuz!", 'success');
                    this.props.history.push('/login');
                }

            })
            .catch((error) => {
                let errStr;

                errStr =  error.response.data.code === 11000 ? 'Bu kullanıcı mevcut': 'Bilinmeyen hata';


                this.showMessage(errStr, 'error');
            });

    };


    render() {
        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar} src={team}/>


                    <Typography component="h1" variant="h5">
                        Üye Ol
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="first_name">İsim</InputLabel>
                            <Input id="first_name" name="first_name" autoComplete="first_name" autoFocus/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="last_name">Soyisim</InputLabel>
                            <Input id="last_name" name="last_name" autoComplete="last_name" autoFocus/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Adresi</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Şifre</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"/>
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            KAYDET
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default compose(
    withStyles(styles),
    withSnackbar
)(Register);
