import React, { Component, Fragment } from 'react';
// НАДА УДАЛИТЬ!!!
// import Calendar from 'react-calendar-material';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import Calendar from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import CustomCalendar from './components/CustomCalendar'
import Dashboard from './dashboard/Dashboard'

const GET_EVENTS_OF_GROUP = gql`
    query group($id: String!) {
        group(id: $id) {
            id_group
            title_group
            institute_id
            events {
                id_event
                title_event
                description
                location
                start_time
                end_time
                id_group
            }
        }
    }
`;

const GET_GROUPS = gql`
        query myGroups {
        myGroups {
            id_group
            title_group
        }
    }
`;
Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

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

class Admin extends Component {

    state = {
        events: false,
        add_modal_visible: false,
        group: false
    };

    componentDidMount() {
        // console.log(new Date(moment().add(120, "minutes")))
        // function eventFire(el, etype){
        //     if (el.fireEvent) {
        //       el.fireEvent('on' + etype);
        //     } else {
        //       var evObj = document.createEvent('Events');
        //       evObj.initEvent(etype, true, false);
        //       el.dispatchEvent(evObj);
        //     }

        // }
        // eventFire(document.getElementById('mytest1'), 'click');
    }

    staterFunc = obj => {
        this.setState(obj)
    }

    handleChange = event => {
        console.log(event.target.name, event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    };

    queryCalendar(id_group) {
        if (id_group)
            return (
                <Query
                    query={GET_EVENTS_OF_GROUP}
                    variables={{ id:  id_group}}
                >
                    {({ data, loading, refetch }) => {
                        if (loading) {
                            return <div>Loading ...</div>;
                        } else {
                            return (
                                <CustomCalendar id_group={id_group} refetch = {refetch} data={data}/>
                            )
                        }
                    }}
                </Query>
            )
        else 
            return <div>Выберите группу</div>
    }

    shrinked = (data) => {
        if (data)
            return { shrink: true }
    }

    renderGroupsList(data) {
        const classes = this.props
        return <div>
            <FormControl className={classes.formControl}>
                    <InputLabel
                        htmlFor="group"
                        {...this.shrinked(this.state.id_group)}>
                        Группа 
                        </InputLabel>
                    <Select
                        value={this.state.id_group || data.myGroups[0].title_group}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'id_group',
                            id: 'id_group',
                        }}
                    >
                        {data.myGroups.map(
                            (row) => <MenuItem value={row.id_group} id_group={row.id_group}>{row.title_group}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
            </FormControl>
            {this.queryCalendar(this.state.id_group)}
        </div>
    }

    render() {
        return <Fragment><Query
            query={GET_GROUPS}
        >
        {({data,loading, refetch}) => {
            if (loading) {
                return <div>Loading ...</div>
            } else {
                return this.renderGroupsList(data)
            }
        }}

        </Query></Fragment>
    }
}
Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin)