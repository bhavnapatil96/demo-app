import React, { Component } from 'react';
import {Table,OverlayTrigger,Tooltip,Pagination,Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {eventList,deleteEvent} from '../../action/index'
import Event_Form from './eventForm'
import {connect} from 'react-redux';
import {baseurl} from '../../config/baseurl'
let flag = 'asc'
const tooltipSort = (
    <Tooltip id="tooltip">
        <strong>Sort</strong>
    </Tooltip>
);
const tooltipSearch = (
    <Tooltip id="tooltip">
        <strong>Search</strong>
    </Tooltip>
);
class Faculty_Event_List extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            event: [],
            totalRecords:3,
            curr:1,
            isActive:false,
            editEvent:[]
        }

    }
    componentWillMount(){
        debugger;
        this.props.eventList();
    }
    componentWillReceiveProps(nextProps){
        debugger;
        this.setState({event:nextProps.eventlist})
    }
    toggleModal=()=>{
        this.setState({
            isActive:true,
        })
    }
    setStateFalse=()=>{
        console.log('called');
        this.setState({
            isActive:false,
            editEvent:[]

        },()=>{
            console.log('clear....',this.state.editEvent);})
    }

    mypage=(no)=>{
        this.setState({curr:no})
    }
    handleEntry=(e)=>{
        this.setState({totalRecords:e.target.value,curr:1})
    }
    search = (e) => {
        debugger;
        const {event} = this.state;
        let newSearch = event.filter((d) =>
            d.name.toLowerCase().toString().includes(e.target.value.toLowerCase())
            || d.date.toLowerCase().toString().includes(e.target.value.toLowerCase())
            ||d.organizer.toLowerCase().toString().includes(e.target.value.toLowerCase())
        );
        if (e.target.value === "") {
            this.setState({event: this.props.eventlist})
        }
        else {
            this.setState({event: newSearch});
        }
    }
    sort = (e) => {
        if (flag === 'asc') {
            var key = e.target.id;
            var myData = [].concat(this.state.event.sort((a, b) => a[key] > b[key]));
            this.setState({student: myData})
            flag = 'desc'
        }
        else if (flag === 'desc') {
            var key = e.target.id;
            var myData = [].concat(this.state.event.sort((a, b) => a[key] < b[key]));
            this.setState({
                event: myData
            })
            flag = 'asc'
        }
    }
    delete=(id)=>{
        let obj={
            id:id
        }
        this.props.deleteEvent(obj);
    }
    openMap=()=>{
        this.props.history.push('/faculty/map')
    }
    render() {
        let pages=[];
        let len=this.state.event.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.state.event.slice(firstRec,lastRec);
        return (
            <div style={{"padding":"80px"}}>
                <div className="col-lg-2">
                    <select onChange={this.handleEntry} className="form-control">
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div className="col-lg-8">
                    <OverlayTrigger placement="top" overlay={tooltipSearch}>
                        <input type="text" placeholder="Search Here" className="form-control" onChange={this.search}/>
                    </OverlayTrigger>
                </div>
                <div className="col-lg-2">
                    <Button bsStyle="success" onClick={this.toggleModal}>Add Event</Button>
                </div>
                <br/>
                <br/>
                <div>
                    <Table striped bordered  hover>
                        <thead>
                        <tr>
                            <th>
                                Name
                                <OverlayTrigger placement="left" overlay={tooltipSort}>
                                    <i id="name" style={{"float": "right"}} onClick={this.sort}
                                       className="fa fa-sort"></i>
                                </OverlayTrigger>
                            </th>
                            <th>
                                Date
                                <OverlayTrigger placement="left" overlay={tooltipSort}>
                                    <i id="date" style={{"float": "right"}} onClick={this.sort}
                                       className="fa fa-sort"></i>
                                </OverlayTrigger>
                            </th>

                            <th>
                                Organizer
                                <OverlayTrigger placement="left" overlay={tooltipSort}>
                                    <i id="organizer" style={{"float": "right"}} onClick={this.sort}
                                       className="fa fa-sort"></i>
                                </OverlayTrigger>
                            </th>
                            <th>
                                Location
                                <OverlayTrigger placement="left" overlay={tooltipSort}>
                                    <i id="location" style={{"float": "right"}} onClick={this.sort}
                                       className="fa fa-sort"></i>
                                </OverlayTrigger>
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            totalRec.map((event,i)=>{
                                let dt=new Date(event.date);
                                return(
                                    <tr onClick={this.openMap}>
                                        <td>{event.name}</td>
                                        <td>{dt.toLocaleDateString()}</td>
                                        <td>{event.organizer}</td>
                                        <td>{event.location}</td>
                                        <td>
                                            <Button bsStyle="danger" onClick={()=>{this.delete(event._id)}}><i className="fa fa-trash"></i></Button>
                                            <Button bsStyle="primary" onClick={()=>{
                                                this.setState({
                                                    editEvent:event
                                                })
                                                this.toggleModal();
                                            }}><i className="fa fa-pencil"></i></Button>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                        <tr>
                            <td colSpan="4">
                                <Pagination bsSize="medium">
                                    <Pagination.Item onClick={()=>this.mypage(1)}><i className="fa fa-angle-double-left"></i></Pagination.Item>
                                    {
                                        (this.state.curr===1)?
                                            <Pagination.Item><i disabled={'true'} className="fa fa-angle-left"></i></Pagination.Item>
                                            :
                                            <Pagination.Item onClick={()=>this.mypage(this.state.curr-1)}><i disabled={'true'} className="fa fa-angle-left"></i></Pagination.Item>
                                    }
                                    <Pagination.Item active={true}>{this.state.curr}</Pagination.Item>
                                    {
                                        (this.state.curr===page)?
                                            <Pagination.Item><i disabled={'true'} className="fa fa-angle-right"></i></Pagination.Item>
                                            :
                                            <Pagination.Item onClick={()=>this.mypage(this.state.curr+1)}><i  className="fa fa-angle-right"></i></Pagination.Item>
                                    }
                                    <Pagination.Item onClick={()=>this.mypage(page)}><i className="fa fa-angle-double-right" ></i></Pagination.Item>
                                </Pagination>
                            </td>
                        </tr>
                    </Table>
                    <Event_Form isShow={this.state.isActive} setStateFalse={this.setStateFalse}  Edit={this.state.editEvent}/>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return{
        eventlist:state.EventReducer.eventList
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({eventList,deleteEvent},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Faculty_Event_List);
