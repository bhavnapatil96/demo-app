import React, { Component } from 'react';
import {Table,OverlayTrigger,Tooltip,Pagination} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {studentList} from '../../action/index'
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


class Student extends Component {
    constructor(props){
        super(props);
        this.state= {
            student: [],
            totalRecords:3,
            curr:1,
        }

    }
    componentWillMount(){
        debugger;
        this.props.studentList();
    }
    componentWillReceiveProps(nextProps){
        debugger;
        this.setState({student:nextProps.studentlist})
    }
    mypage=(no)=>{
        this.setState({curr:no})
    }
    handleEntry=(e)=>{
        this.setState({totalRecords:e.target.value,curr:1})
    }
    search = (e) => {
        debugger;
        const {student} = this.state;
        let newSearch = student.filter((d) =>
            d.fullname.toLowerCase().toString().includes(e.target.value.toLowerCase())
            || d.email.toLowerCase().toString().includes(e.target.value.toLowerCase())
        );
        if (e.target.value === "") {
            this.setState({student: this.props.studentlist})
        }
        else {
            this.setState({student: newSearch});
        }
    }
    sort = (e) => {
        if (flag === 'asc') {
            var key = e.target.id;
            var myData = [].concat(this.state.student.sort((a, b) => a[key] > b[key]));
            this.setState({student: myData})
            flag = 'desc'
        }
        else if (flag === 'desc') {
            var key = e.target.id;
            var myData = [].concat(this.state.student.sort((a, b) => a[key] < b[key]));
            this.setState({
                student: myData
            })
            flag = 'asc'
        }
    }
    render() {
        let pages=[];
        let len=this.state.student.length;
        let page=Math.ceil(len/this.state.totalRecords)
        for(let i=1;i<=page;i++){
            pages.push(i);
        }
        let lastRec=this.state.curr*this.state.totalRecords;
        let firstRec=lastRec-this.state.totalRecords;
        let totalRec=this.state.student.slice(firstRec,lastRec);
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
                <br/>
                <br/>
                <div>
                    <Table striped bordered  hover>
                    <thead>
                    <tr>
                        <th>
                            Fullname
                            <OverlayTrigger placement="left" overlay={tooltipSort}>
                                <i id="fullname" style={{"float": "right"}} onClick={this.sort}
                                   className="fa fa-sort"></i>
                            </OverlayTrigger>
                        </th>
                        <th>
                            Email
                            <OverlayTrigger placement="left" overlay={tooltipSort}>
                                <i id="email" style={{"float": "right"}} onClick={this.sort}
                                   className="fa fa-sort"></i>
                            </OverlayTrigger>
                        </th>

                        <th>Gender</th>
                        <th>Photo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        totalRec.map((student,i)=>{
                            return(
                                <tr>
                                    <td>{student.fullname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.gender}</td>
                                    <td><img src={baseurl+'/upload/'+student.photo}/></td>

                                </tr>
                            )
                        })
                    }
                    </tbody>
                    <tr>
                        <td colSpan="4">
                            <Pagination bsSize="large">
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

                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return{
        studentlist:state.StudentReducer.studentList
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({studentList},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Student);
