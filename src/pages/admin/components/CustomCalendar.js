import React, { Component, Fragment } from 'react';
// НАДА УДАЛИТЬ!!!
// import Calendar from 'react-calendar-material';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import Calendar from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import AddEventModal from './AddEventModal'
import EditEventModal from './EditEventModal'


Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

const CHANGE_EVENT = gql`
  mutation changeEvent(
    $title_event: String!,
    $start_time: String!,
    $id_group: String!,
    $end_time: String!,
    $description: String!,
    $location: String!,
    $id_event: String!
  ) {
    changeEvent(
        title_event: $title_event,
        start_time: $start_time,
        id_group: $id_group,
        end_time: $end_time,
        description: $description,
        location: $location,
        id_event: $id_event,

    ) {
      id_event
      title_event
      description
      start_time
      end_time
      location
      id_group
    }
  }
`;

class CalendarCustom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: false,
            add_modal_visible: false,
            add_modal_change_visible: false,
            data: this.props.data,
            parsed_data: [],
            changed_data: [],
            to_change_data: [],
        }
    }


    componentDidMount() {
        // setInterval(()=>console.log(this.props.data, this.state.data), 1000)
        this.dataParser()
    }

    pushEvent = (data) => {
        let new_data = this.state.parsed_data

        new_data.push({
            id: data.id_event,
            title: data.title_event,
            description: data.description,
            location: data.location,
            start: new Date(
                data.start_time.substr(0, 4),
                data.start_time.substr(4, 2) - 1,
                data.start_time.substr(6, 2),
                data.start_time.substr(9, 2),
                data.start_time.substr(11, 2),
                data.start_time.substr(13, 2)
            ),
            end: new Date(
                data.end_time.substr(0, 4),
                data.end_time.substr(4, 2) - 1,
                data.end_time.substr(6, 2),
                data.end_time.substr(9, 2),
                data.end_time.substr(11, 2),
                data.end_time.substr(13, 2)
            ),
        })

        this.setState({
            parsed_data: new_data
        })
    }

    dataParser = () => {
        let new_data = []
        let data = this.props.data
        console.log(data)
        data.group.events.forEach(element => {
            new_data.push({
                id: element.id_event,
                title: element.title_event,
                description: element.description,
                location: element.location,
                start: new Date(
                    element.start_time.substr(0, 4),
                    element.start_time.substr(4, 2) - 1,
                    element.start_time.substr(6, 2),
                    element.start_time.substr(9, 2),
                    element.start_time.substr(11, 2),
                    element.start_time.substr(13, 2)
                ),
                end: new Date(
                    element.end_time.substr(0, 4),
                    element.end_time.substr(4, 2) - 1,
                    element.end_time.substr(6, 2),
                    element.end_time.substr(9, 2),
                    element.end_time.substr(11, 2),
                    element.end_time.substr(13, 2)
                ),
            })
        });
        this.setState({
            parsed_data: new_data
        })
    }

    chengedData = (data, changeEvent) => {
        // this.setState({
        //     changed_data: this.state.changed_data.push(data)
        // },()=>console.log(this.state.changed_data))

        let newStartDate = data.start.getFullYear() +
            this.toTwoString(data.start.getMonth() + 1) +
            this.toTwoString(data.start.getDate()) + "T" +
            this.toTwoString(data.start.getHours()) +
            this.toTwoString(data.start.getMinutes()) +
            "00"
        let newEndDate = data.end.getFullYear() +
            this.toTwoString(data.end.getMonth() + 1) +
            this.toTwoString(data.end.getDate()) + "T" +
            this.toTwoString(data.end.getHours()) +
            this.toTwoString(data.end.getMinutes()) +
            "00"

        let res = {
            id_event: data.id,
            title_event: data.title,
            start_time: newStartDate,
            end_time: newEndDate,
            id_group: this.props.id_group,
            description: data.description,
            location: data.location
        }
        console.log(data)
        console.log(res)

        changeEvent({ variables: res })
    }

    toTwoString = num => {
        let str = num.toString(),
            res
        if (str.length === 1) {
            res = "0" + str
            return res
        } else {
            return str
        }
    }

    changeEventTime = (event, start, end, data, changeEvent) => {




        this.setState({
            parsed_data: data
        }, () => {
            this.setState(state => {
                let ident = 0
                for (let i = 0; i < state.parsed_data.length; i++) {

                    if (state.parsed_data[i].id === event.id) {
                        ident = i
                    }
                }

                state.parsed_data[ident].start = start
                state.parsed_data[ident].end = end
                this.chengedData(state.parsed_data[ident], changeEvent)


                return { parsed_data: state.parsed_data }
            });
        })
    }

    onEventResize = (type, { event, start, end, allDay }, data, changeEvent) => {
        this.changeEventTime(event, start, end, data, changeEvent)
        return null
    };


    onEventDrop = ({ event, start, end, allDay }, data, changeEvent) => {
        this.changeEventTime(event, start, end, data, changeEvent)
        return null
    }

    returnData = (new_data) => {
        if (this.state.events) {
            return this.state.events
        } else {
            return new_data
        }
    }

    onSelect = (e, data) => {
        this.setState({
            add_event_data: e,
            events: data,
        }, () => {
            this.setState({
                add_modal_visible: true
            })
        })
    }

    filterData = (changeEvent) => {
        if (this.props.data) {

            return <div 
            style = {{
                maxWidth: "calc(100% - 32px)",
                margin: "16px",
            }}

        >

                <DnDCalendar
                    defaultDate={new Date()}
                    defaultView="week"
                    // onSelecting = {(e) => this.onSelect(e)}
                    onSelectSlot={(e) => this.onSelect(e, this.state.parsed_data, changeEvent)}
                    onSelectEvent = {e => this.setState({
                        add_modal_change_visible: true,
                        to_change_data: e
                    })}
                    selectable={true}
                    events={this.state.parsed_data}
                    onEventDrop={arg => this.onEventDrop(arg, this.state.parsed_data, changeEvent)}
                    onEventResize={(type, arg) => this.onEventResize(type, arg, this.state.parsed_data, changeEvent)}
                    resizable
                    style={{ height: "100vh" }}
                />
            </div>
        } else {
            return "kek"
        }

    }

    staterFunc = obj => {
        this.setState(obj)
    }

    renderModals (changeEvent) {
        const stylish = {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 100,
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        }
        return <Fragment>
        {this.state.add_modal_visible && (
            <div
                style={stylish}
            >
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }} onClick={() => this.staterFunc({ add_modal_visible: false })}></div>
                <AddEventModal id_group={this.props.id_group} pushEvent={this.pushEvent} refetch={this.props.refetch} parentStater={this.staterFunc} data={this.state.add_event_data}></AddEventModal>
            </div>
        )}
        {this.state.add_modal_change_visible && (
            <div
                style={stylish}
            >
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }} onClick={() => this.staterFunc({ add_modal_change_visible: false })}></div>
                <EditEventModal changeEvent = {changeEvent} parentStater = {this.staterFunc} to_change_data = {this.state.to_change_data} />
                {/* <AddEventModal pushEvent={this.pushEvent} refetch={this.props.refetch} parentStater={this.staterFunc} data={this.state.add_event_data}></AddEventModal> */}
            </div>
        )}
        </Fragment>
    }


    render() {
        return (
            <Mutation mutation={CHANGE_EVENT}>
                {(changeEvent, { data }) => (
                    <Fragment>
                        {this.renderModals(changeEvent)}
                        {this.filterData(changeEvent)}
                    </Fragment>

                )}
            </Mutation>
        )

    }
}
export default CalendarCustom