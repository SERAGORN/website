import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
{
    institutes {
        id_institute
        title
        groups {
            id_group
            title_group
            institute_id
        }
    }
}
`;

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
        width: "100%"
    },
});

class SimpleSelect extends Component {
    state = {
        age: '',
        name: 'hai',
        data: [],
    };

    handleChange = event => {
        console.log(event.target.name)
        this.setState({ [event.target.name]: event.target.value });
    };

    shrinked = (data) => {
        if (data)
            return { shrink: true }
    }

    groupRender = (data) => {
        const { classes } = this.props;
        if (this.state.institute) {
            return (
                <FormControl className={classes.formControl}>
                    <InputLabel
                        htmlFor="group"
                        {...this.shrinked(this.state.group)}>
                        Группа 
                        </InputLabel>
                    <Select
                        value={this.state.group}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'group',
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem value={false}>
                            <em>None</em>
                        </MenuItem>
                        {data[parseInt(this.state.institute-1)].groups.map(
                            (row) => <MenuItem value={row.id_group}>{row.title_group}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>
            )
        }
    }


    getInst = (data) => {
        const { classes } = this.props;
        return (
            <Fragment>
                <FormControl className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        {...this.shrinked(this.state.institute)}
                        htmlFor="age-simple">Факультет</InputLabel>
                    <Select
                        value={this.state.institute}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'institute',
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem value={false}>
                            {this.state.institute && <em>None</em>}
                        </MenuItem>
                        {data.map((row, key) => <MenuItem value={key+1}>{row.title}</MenuItem>)}
                    </Select>
                    <FormHelperText>Выберите факультет</FormHelperText>
                </FormControl>
                {this.groupRender(data)}
            </Fragment>
        )
    }

    query = () => {
        return (
            <Query query={GET_REPOSITORIES_OF_ORGANIZATION}>
                {({ data, loading }) => {
                    if (loading) {
                        return <div>Loading ...</div>;
                    }
                    return this.getInst(data.institutes);
                }}
            </Query>
        )
    }

    getCals = () => {
        alert(this.state.group)
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">

                {this.query()}

                <Button variant="contained" color="primary" onClick={this.getCals} className={classes.button}>
                    Подписаться
                </Button>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);