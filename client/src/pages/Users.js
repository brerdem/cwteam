import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import axios from "axios/index";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({

    table: {
        minWidth: 700,

    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});


class Users extends Component {

    state = {
        loading: true,
        users: []

    };

    componentDidMount() {
        axios.post('/api/users', {

            access_token: localStorage.getItem('id_token')

        }).then((response) => {
            this.setState({
                users: response.data,
                loading: false,

            })

        });
        this.setState({
            value: this.props.location.pathname === '/todos/timeline' ? 1 : 0
        })


    }


    render() {
        const {classes} = this.props;
        this.state.users.sort((a, b) => a.name.localeCompare(b.name))
        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {

            content = <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>İsim</CustomTableCell>
                            <CustomTableCell align="right">Ünvan</CustomTableCell>
                            <CustomTableCell align="right">E-mail</CustomTableCell>
                            <CustomTableCell align="right">Bio</CustomTableCell>
                            <CustomTableCell align="right">Yetki</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map(user => {

                                return (
                                    <TableRow className={classes.row} key={user.id}>
                                        <CustomTableCell component="th" scope="row">
                                            <ListItem>
                                                <Avatar src={user.avatar_url}/>
                                                <ListItemText primary={user.name}/>
                                            </ListItem>
                                        </CustomTableCell>
                                        <CustomTableCell align="right">{user.title}</CustomTableCell>
                                        <CustomTableCell align="right">{user.email_address}</CustomTableCell>
                                        <CustomTableCell align="right">{user.bio}</CustomTableCell>
                                        <CustomTableCell align="right">{user.personable_type}</CustomTableCell>
                                    </TableRow>
                                );

                        })}
                    </TableBody>
                </Table>
            </Paper>

        }


        return (


            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="primary"
                                className={classes.headingPadding}>
                        KULLANICILAR
                    </Typography>
                    {content}

                </div>

            </main>

        )
    }
}


Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
