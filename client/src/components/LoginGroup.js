import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon';
import {withStyles} from "@material-ui/core/styles/index";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from '@material-ui/icons/Mail';
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withRouter from "react-router-dom/es/withRouter";
import {compose} from 'recompose';
import Paper from "@material-ui/core/es/Paper/Paper";
import ClickAwayListener from "@material-ui/core/es/ClickAwayListener/ClickAwayListener";
import Grow from "@material-ui/core/es/Grow/Grow";
import Popper from "@material-ui/core/es/Popper/Popper";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Warning from "@material-ui/icons/Warning"
import Divider from "@material-ui/core/es/Divider/Divider";
import UserAvatar from 'react-user-avatar'

const styles = theme => ({

    leftIcon: {
        marginRight: theme.spacing.unit,
    },

    whiteColor: {
        color: theme.palette.common.white
    },
    avatar: {
        color: '#203ac0',
        backgroundColor: '#fff'
    },
    container: {
        width: '50%',
        marginLeft: 'auto'
    }

});

class LoginGroup extends Component {

    state = {
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };
    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes, auth} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);


        return (

            <Grid container justify="flex-end" alignItems="center" className={classes.container}>

                <Button color="inherit" variant="outlined" href="https://www.basecamp.com"
                        target="_blank"
                        className={classes.leftIcon}>
                    <Icon className={classes.leftIcon}>launch</Icon>
                    BASECAMP'E GİT
                </Button>


                <div><IconButton color="inherit"
                                 aria-owns={open ? 'menu-list-grow' : undefined}
                                 aria-haspopup="true"
                                 onClick={this.handleMenu}
                >
                    <Badge className={classes.margin} badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>


                    <IconButton color="inherit" onClick={() =>  this.props.history.push(`/user/detail/${auth.user._id}`)}>
                        <UserAvatar size={40} name={auth.user.name} src={auth.user.avatar_url ? `http://www.clockwork.com.tr/mailing/cwteam/users/${auth.user.avatar_url}.png`: null } />
                    </IconButton>

                    <Popper open={open} anchorEl={anchorEl} transition disablePortal placement="bottom-end" style={{marginTop:10}}>
                        {({TransitionProps}) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{transformOrigin: 'top'}}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <List dense>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Warning/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Mesaj içeriği 1"

                                                />
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Warning/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Mesaj içeriği 2"

                                                />
                                            </ListItem>

                                        </List>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>


            </Grid>

        );
    }

}

export default compose(
    withStyles(styles),
    withRouter
)(LoginGroup);



