import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Header from "../components/Header";
import theme from "../components/Styles";
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";


function DashboardGrid(props) {

    const cardsContent = [
        { title: "Projeler", link: "/projects", description: "Proje bazlı gösterim", img: "projects.png" },
        { title: "To-Dos", link: "/todos", description: "To-do'ların Kanban gösterimi", img: "todos.png" },
        { title: "Kullanıcılar", link: "/users", description: "Kullanıcıların işleri", img: "users.png" },
    ];


    const {classes} = props;
    return (

        <Grid container spacing={24}>
            {cardsContent.map(item => (
                <Grid item xs={4}>
                    <Card className={classes.cardDashboard}>
                        <CardActionArea href={item.link}>
                            <CardMedia
                                className={classes.cardmedia}
                                image={require(`../static/media/${item.img}`)}
                                title={item.title}
                            />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                                {item.title}
                            </Typography>
                            <Typography>
                                {item.description}
                            </Typography>
                        </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
            ))
            }
        </Grid>
    )


}


DashboardGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

const DashboardGridWrapper = withStyles(theme)(DashboardGrid);


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            projects: [],
            labelWidth: 0,
            loading: false


        };
    }

    handleChange = event => {
        //this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
        axios.post('/api/projects', {

            access_token: JSON.parse(localStorage.getItem('id_token')).access_token

        }).then((response) => {
            this.setState({
                loading: false,
                projects: response.data
            })

        })


    }


    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <Header history={this.props.history}/>
                <main className={classes.layout}>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="primary" gutterBottom>
                            DASHBOARD
                        </Typography>
                        <DashboardGridWrapper />

                    </div>

                </main>

            </React.Fragment>
        )
    }
}


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Dashboard);
