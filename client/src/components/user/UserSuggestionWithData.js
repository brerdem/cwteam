import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import {withStyles} from '@material-ui/core/styles'
import UserAvatar from 'react-user-avatar';
import departments from "../../helpers/departments";
import Grid from "@material-ui/core/es/Grid/Grid";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/es/ListItemAvatar/ListItemAvatar";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import stylesMain from '../styles/Styles';
import TextField from "@material-ui/core/es/TextField/TextField";
import NumericInput from "react-numeric-input";
import Clear from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/es/IconButton/IconButton";

const AssigneeCardContent = ({user, classes, onDataChange, onDelete, index, dataType}) => {
    console.log('user -->', user);

    return (

        <Card className={classes.cardDashboard}>


            <CardContent className={classes.cardContent}
                         style={{
                             padding: '12px 0px 12px 16px',
                             borderRight: 'solid 5px ' + departments.find(t => t.name === user.user.department).color
                         }}>
                <Grid container>

                    <Grid container item justify="flex-end">
                        <IconButton color="secondary" style={{width: 20, height: 20, padding: 0, marginTop: -10}}
                                    onClick={() => onDelete(index)}><Clear
                            style={{width: 14, height: 14}}/></IconButton>
                    </Grid>
                    <Grid item container direction="row" justify="flex-start" alignItems="center">
                        <Grid item xs={8}>
                            <ListItem alignItems="flex-start" disableGutters>
                                <ListItemAvatar>
                                    <UserAvatar className={classes.userAvatarText} size={40}
                                                name={user.user.name}
                                                src={user.user.avatar_url ? `/img/users/${user.user.avatar_url}.png` : null}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.user.name}
                                    secondary={user.user.title}
                                />
                            </ListItem>
                        </Grid>

                        <NumericInput
                            min={1}
                            value={dataType === 'effort' ? user.effort : user.hourly_fee}
                            onChange={onDataChange(user.user._id)}
                            style={{
                                input: {
                                    width: 50,
                                    fontSize: 14
                                }

                            }}

                        />
                    </Grid>


                </Grid>

            </CardContent>


        </Card>

    )
};

export const AssigneeCard = withStyles(stylesMain)(AssigneeCardContent);

function renderInput(inputProps) {
    const {classes, value, onChange, ref, ...other} = inputProps;

    return (
        <TextField
            fullWidth
            placeholder="İlgili kişiler"
            value={value}
            inputRef={ref}
            onChange={onChange}
            {...other}
        />

    )
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
        <MenuItem
            selected={isHighlighted}
            component='div'
            onMouseDown={(e) => e.preventDefault()} // prevent the click causing the input to be blurred
        >
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </span>
                    ) : (
                        <strong key={String(index)} style={{fontWeight: 500}}>
                            {part.text}
                        </strong>
                    )
                })}
            </div>
        </MenuItem>
    )
}

function renderSuggestionsContainer(options) {
    const {containerProps, children} = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    )
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function getSuggestions(value, suggestions) {

    const inputValue = value.trim().toLocaleLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;

            if (keep) {
                count += 1
            }

            return keep
        })
}

const styles = theme => ({
    container: {
        marginTop: 10,
        flexGrow: 1,
        position: 'relative',
        minHeight: 80

    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0
    },
    suggestion: {
        display: 'block'
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none'
    },
    textField: {
        width: '100%'
    },
    chipWithAvatar: {
        margin: '0 5px 18px 0'
    }
});

class UserSuggestionWithData extends Component {

    state = {

        suggestions: [],
        value: [],
        list: [],
        textFieldInput: '',

    };

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.list.map(m => m.user))
        })
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    };

    handletextFieldInputChange = (event, {newValue}) => {
        this.setState({
            textFieldInput: newValue
        });
    };

    handleAddMember(memberName) {

        this.setState({
            value: [...this.state.value, memberName],
            textFieldInput: ''
        }, () => {
            this.props.onUserAdd(this.state.list.filter(m => this.state.value.includes(m.user.name)));

        });

    }

    handleDeleteMember = index => {

        let temp = this.state.value;

        temp.splice(index, 1);

        this.setState({
            value: temp,
        }, () => {
            this.props.onUserAdd(this.state.list.filter(m => this.state.value.includes(m.user.name)));
        });
    };

    handleMemberDataChange = userId => val => {
        let temp = this.state.list.filter(m => this.state.value.includes(m.user.name));
        temp.find(m => m.user._id === userId)[this.props.dataType] = val;
        this.setState({list: temp}, () => this.props.onUserAdd(temp));

    };

    componentDidMount() {
        this.setState({list: this.props.list})
    }

    render() {
        const {classes, dataType} = this.props;
        const {suggestions, value, textFieldInput, list} = this.state;

        return (

            <Fragment>

                <Autosuggest
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                    }}
                    renderInputComponent={renderInput}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                    renderSuggestionsContainer={renderSuggestionsContainer}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    highlightFirstSuggestion={true}
                    onSuggestionSelected={(e, {suggestionValue}) => {
                        this.handleAddMember(suggestionValue);
                        e.preventDefault()
                    }}
                    focusInputOnSuggestionClick={false}
                    inputProps={{
                        classes,
                        onChange: this.handletextFieldInputChange,
                        value: textFieldInput,

                    }}
                />
                <Grid container spacing={8} alignItems="stretch">
                    {value.map((val, index) =>
                        <Grid item xs={4} key={val}>
                            <AssigneeCard user={list.find(u => u.user.name === val)}
                                          onDataChange={this.handleMemberDataChange}
                                          onDelete={this.handleDeleteMember} index={index} dataType={dataType}/>
                        </Grid>
                    )}


                </Grid>

            </Fragment>

        )
    }
}

UserSuggestionWithData.propTypes = {
    classes: PropTypes.object.isRequired,
    onUserAdd: PropTypes.func,
    onUserDelete: PropTypes.func,
    onUserDataChange: PropTypes.func,

};

export default withStyles(styles)(UserSuggestionWithData)
