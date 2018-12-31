import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import {withStyles} from '@material-ui/core/styles'
import ChipInput from 'material-ui-chip-input'
import Chip from "@material-ui/core/es/Chip/Chip";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import randomcol from 'randomcolor';


function renderInput(inputProps) {
    const {classes, autoFocus, value, onChange, onAdd, onDelete, chips, ref, ...other} = inputProps;


    return (
        <ChipInput
            fullWidth
            placeholder={'İlgili kişiler'}
            clearInputValueOnChange
            onUpdateInput={onChange}
            onAdd={onAdd}
            onDelete={onDelete}
            value={chips}
            inputRef={ref}
            chipRenderer={({value, text, chip}, key) => <Chip
                key={key}
                className={classes.chipWithAvatar}
                avatar={<Avatar style={{backgroundColor:text.avatar_bg, color:'white'}}>{(text.first_name+' '+text.last_name).replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g).join('')}</Avatar>}
                label={value.first_name+' '+value.last_name}
                onDelete={onDelete}

            />}
            {...other}
        />

    )
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.first_name + ' ' + suggestion.last_name, query)
    const parts = parse(suggestion.first_name + ' ' + suggestion.last_name, matches)

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
    const {containerProps, children} = options

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    )
}

function getSuggestionValue(suggestion) {
    for (let i = 0 ; i < 10; i++) console.log(randomcol({luminosity:'dark'}) );
    return suggestion;
}

function getSuggestions(value, suggestions) {
    const inputValue = value.trim().toLocaleLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && (suggestion.first_name + ' ' + suggestion.last_name).toLowerCase().slice(0, inputLength) === inputValue;

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
        height: 200
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
        margin:'0 5px 18px 0'
    }
})

class UserSuggestionInput extends React.Component {


    suggestions = this.props.suggestions;


    state = {
        // value: '',
        suggestions: [],
        value: [],
        textFieldInput: ''
    };

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.suggestions)
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

    handleAddChip(chip) {

        this.setState({
            value: [...this.state.value, chip],
            textFieldInput: ''
        }, ()=> {
            this.props.onUserAdd(this.state.value);
        });


    }

    handleDeleteChip(chip, index) {
        let temp = this.state.value;
        temp.splice(index, 1);
        this.setState({value: temp})
    }

    render() {
        const {classes, ...rest} = this.props;

        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                highlightFirstSuggestion={true}
                onSuggestionSelected={(e, {suggestionValue}) => {
                    this.handleAddChip(suggestionValue);
                    e.preventDefault()
                }}
                focusInputOnSuggestionClick={false}
                inputProps={{
                    classes,
                    chips: this.state.value,
                    onChange: this.handletextFieldInputChange,
                    value: this.state.textFieldInput,
                    onAdd: (chip) => this.handleAddChip(chip),
                    onDelete: (chip, index) => this.handleDeleteChip(chip, index),
                    ...rest
                }}
            />
        )
    }
}

UserSuggestionInput.propTypes = {
    classes: PropTypes.object.isRequired
}

export default UserSuggestionInput = withStyles(styles)(UserSuggestionInput)
