import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {addEvent, editEvent} from '../../action/index'

class Event_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: true,
            event: [],
            editId: ''
        }
    }

    handleChange = (e) => {
        const {value, name} = e.target
        const {event} = this.state;
        event.name = value
        this.setState({ event}, () => {
            console.log('state ', this.state.event)
        })
    }

    componentWillReceiveProps(nextProps) {
        debugger
        if (nextProps.Edit && nextProps.Edit._id) {
            this.setState({event: nextProps.Edit, editId: nextProps.Edit._id},()=>{
                console.log("Event",this.state.event)
            })
        }
    }

    navigate = () => {
        debugger;
        this.props.setStateFalse();
    }
    save = (e) => {
        e.preventDefault();

        const {event} = this.state;

        if (this.state.editId) {
            debugger
            console.log('edit Id', this.state.editId)
            let formdata = new FormData();
            formdata.append('name', event.name);
            formdata.append('date', event.date);
            formdata.append('organizer', event.organizer);
            formdata.append('id', this.state.editId);
            this.props.editEvent(formdata).then((data) => {
                if (data) {
                    this.navigate()
                }
            });
        }
        else {
            let formdata = new FormData();
            formdata.append('name', event.name);
            formdata.append('date', event.date);
            formdata.append('organizer', event.organizer);
            this.props.addEvent(formdata).then((data) => {
                if (data) {
                    this.navigate()
                }
            });

        }

    };

    render() {

        let {event} = this.state;
        return (
            <div>
                <Modal show={this.props.isShow} onHide={this.navigate}>
                    <Modal.Header>
                        <Modal.Title>Event Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.save} action="" method="post" encType="multipart/form-data">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" for="txtname">Event Name</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="text"
                                           value={event && event.name}
                                           placeholder="Event Name" onChange={this.handleChange} name="name"
                                           required="true"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" for="txtname">Date</label>
                                <div className="col-sm-10">

                                    {
                                        event && event._id ? <input className="form-control" type="date"
                                                                    value={event && event.date.split("T")[0]}
                                                                    onChange={this.handleChange} name="date"
                                                                    required="true"/> :
                                            <input className="form-control" type="date"
                                                   value={event && event.date}
                                                   onChange={this.handleChange} name="date" required="true"/>
                                    }

                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" for="txtname">Organizer</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="text"
                                           value={event && event.organizer}
                                           placeholder="Organizer" onChange={this.handleChange} name="organizer"
                                           required="true"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label" for="txtname"></label>
                                <div className="col-sm-10">
                                    <input type="submit" className="btn btn-success" value="Save"/>
                                </div>
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.navigate}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    debugger
    return {
        newevent: state.EventReducer.eventList
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addEvent, editEvent},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Event_Form);

