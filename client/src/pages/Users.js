import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import axios from "axios/index";
import Typography from "@material-ui/core/Typography";
import theme from '../components/styles/Styles';
import Grid from "@material-ui/core/es/Grid/Grid";
import Card from "@material-ui/core/es/Card/Card";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/es/ListItemAvatar/ListItemAvatar";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import departments from '../helpers/departments'
import UserAvatar from 'react-user-avatar'
import Icon from "@material-ui/core/es/Icon/Icon";

class Users extends Component {

    state = {
        loading: true,
    };

    handleLink = id => e => {
        this.props.history.push(`/user/detail/${id}`);
    };


    render() {
        const {classes, loading, users} = this.props;
        let content;
        if (loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            content =
                <Grid container spacing={24}>
                    {users.map((user, index) => (
                        <Grid item xs={4} key={index}>
                            <Card className={classes.cardDashboard}>

                                <CardActionArea onClick={this.handleLink(user._id)}>

                                    <CardContent className={classes.cardContent}
                                                 style={{borderRight: 'solid 5px ' + departments.find(t => t.name === user.department).color}}>
                                        <Grid container direction="row" alignItems="center" justify="space-between">
                                            <Grid item xs={20}>
                                                <ListItem alignItems="flex-start" disableGutters>
                                                    <ListItemAvatar>
                                                        <UserAvatar className={classes.userAvatarText} size={40}
                                                                    name={user.name}
                                                                    src={user.avatar_url ? `http://www.clockwork.com.tr/mailing/users/${user.avatar_url}.png` : null}/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={user.first_name + ' ' + user.last_name}
                                                        secondary={user.title}
                                                    />
                                                </ListItem>
                                            </Grid>
                                            {user.access === "admin" &&
                                            <Icon style={{color: '#900'}}>star</Icon>
                                            }
                                        </Grid>

                                    </CardContent>

                                </CardActionArea>

                            </Card>
                        </Grid>
                    ))
                    }
                </Grid>
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

export default withStyles(theme)(Users);
