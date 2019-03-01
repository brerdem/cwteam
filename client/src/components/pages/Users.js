import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography";
import theme from '../styles/Styles';
import Grid from "@material-ui/core/es/Grid/Grid";
import Card from "@material-ui/core/es/Card/Card";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/es/ListItemAvatar/ListItemAvatar";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import departments from '../../helpers/departments'
import UserAvatar from 'react-user-avatar'
import Icon from "@material-ui/core/es/Icon/Icon";
import {compose} from 'recompose';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

class Users extends Component {

    state = {
        loading: true,
        software: true,
        design: true,
        account: true,
        social: true,
        users: this.props.users
    };

    handleDepartmentChange = name => event => {
        this.setState({[name]: event.target.checked}, () => {
            console.log('this.props.users.length -->', this.props.users.length);
            this.setState({users: this.props.users.filter(u => departments.map(d => this.state[d.def] ? d.name : '').includes(u.department))})
        });
    };

    handleLink = id => e => {
        this.props.history.push(`/user/detail/${id}`);
    };

    render() {
        const {classes} = this.props;
        const {users} = this.state;


        return (

            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="primary"
                                className={classes.headingPadding}>
                        KULLANICILAR
                    </Typography>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                            <Grid container justify="center" alignItems="center" direction="row">
                                {departments.map(department =>

                                    <FormControlLabel key={department.def}
                                                      control={
                                                          <Checkbox style={{color: department.color}}
                                                                    checked={this.state[department.def]}
                                                                    onChange={this.handleDepartmentChange(department.def)}
                                                                    value={department.def}/>
                                                      }
                                                      label={department.name}
                                    />
                                )}
                            </Grid>
                        </FormGroup>
                    </FormControl>
                    <Grid container spacing={24}>
                        {users.map((user, index) => (
                            <Grid item xs={4} key={index}>
                                <Card className={classes.cardDashboard}>

                                    <CardActionArea onClick={this.handleLink(user._id)}>

                                        <CardContent className={classes.cardContent}
                                                     style={{borderRight: 'solid 5px ' + departments.find(t => t.name === user.department).color}}>
                                            <Grid container direction="row" alignItems="center" justify="space-between">
                                                <Grid item>
                                                    <ListItem alignItems="flex-start" disableGutters>
                                                        <ListItemAvatar>
                                                            <UserAvatar className={classes.userAvatarText} size={40}
                                                                        name={user.name}
                                                                        src={user.avatar_url ? `/img/users/${user.avatar_url}.jpg` : null}/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={user.name}
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

                </div>

            </main>

        )
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(theme)
)(Users);
