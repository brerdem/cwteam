import React, {Component} from 'react';
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";
import Typography from "@material-ui/core/es/Typography/Typography";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import axios from "axios";
import {getToken} from "../../../actions/auth";

const withAddButton = (Wrapped) => {
    class HOC extends Component {
        state = {
            open: false,
            team: []
        };

        handleClose = () => {
            this.setState({
                open: false,

            })
        };

        handleOpen = () => {
            this.setState({
                open: true
            });


        };

        componentDidMount() {
            axios.get('/api/project/' + this.props.project_id + '/team', {
                headers: {'Authorization': 'bearer ' + getToken()}
            })
                .then((response) => {
                    console.log(response);
                    this.setState({
                        team: response.data.team
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }


        render() {

            const {open, team} = this.state;
            const {addTask, project_id} = this.props;

            return (
                <div>
                    <ListItem>
                        <Fab color="primary" size="small" style={{marginRight: 10}} onClick={this.handleOpen}>
                            <Add/>
                        </Fab>
                        <Typography variant="button"> YENİ EKLE </Typography>
                    </ListItem>


                    <Wrapped open={open} onClose={this.handleClose} team={team} addTask={addTask} project_id={project_id} {...this.props} />
                </div>

            );
        }


    }

    return HOC;


};

export default withAddButton;
