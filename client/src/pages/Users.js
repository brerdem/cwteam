import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import axios from "axios/index";
import Typography from "@material-ui/core/Typography";
import theme from '../components/styles/Styles';
import Grid from "@material-ui/core/es/Grid/Grid";
import Card from "@material-ui/core/es/Card/Card";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/es/ListItemAvatar/ListItemAvatar";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import UserAvatar from "../components/user/UserAvatar";
import departments from '../helpers/departments'

class Users extends Component {

    state = {
        loading: true,
        users: []

    };

    componentDidMount() {
        /* axios.get('/api/user/makeusers').then((response) => {
           this.setState({loading: false})

         });*/

        axios.get('/api/user/all').then((response) => {
            this.setState({loading: false, users: response.data})

        })

    }

    hex2rgb = (hex, opacity) => {
        let h=hex.replace('#', '');
        h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

        for(let i=0; i<h.length; i++)
            h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);

        if (typeof opacity !== 'undefined')  h.push(opacity);

        return 'rgba('+h.join(',')+')';
    };


    render() {
        const {classes} = this.props;
        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            content =
                <Grid container spacing={24}>
                    {this.state.users.map((user, index) => (
                        <Grid item xs={4} key={index}>
                            <Card className={classes.cardDashboard}>

                                <CardActionArea onClick={() => this.props.history.push('/')}>

                                    <CardContent className={classes.cardContent} style={{backgroundColor: this.hex2rgb(departments.find(t => t.name === user.department).color, .2)}}>
                                        <ListItem alignItems="flex-start" disableGutters>
                                            <ListItemAvatar>
                                                <UserAvatar alt="Clockwork" style={{backgroundColor: user.avatar_bg}} first_name={user.first_name} last_name={user.last_name} src={user.avatar_url === ''? '': require(`../static/media/users/${user.avatar_url}.png`)} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={user.first_name+' '+user.last_name}
                                                secondary={user.title}
                                            />
                                        </ListItem>
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
