import React from 'react';
import {Table, FormGroup, ControlLabel, FormControl, OverlayTrigger,Button,Pagination,Tooltip} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {facultyList} from '../../action/index'
import {baseurl} from '../../config/baseurl'
import Faculty_Form from './facultyForm'

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

class Faculty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faculty: [],
            totalRecords: 3,
            curr: 1,
            isActive: false,
        }

    }

    componentWillMount() {
        debugger;
        this.props.facultyList();
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        this.setState({faculty: nextProps.facultylist})
    }

    mypage = (no) => {
        this.setState({curr: no})
    }
    handleEntry = (e) => {
        this.setState({totalRecords: e.target.value, curr: 1})
    }
    toggle = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    setStateFalse(newData) {
        debugger;
        this.setState({
            isActive: false
        })
        this.state.faculty.push(newData);
    }

    search = (e) => {
        debugger;
        const {faculty} = this.state;
        let newSearch = faculty.filter((d) =>
            d.fullname.toLowerCase().toString().includes(e.target.value.toLowerCase())
            || d.email.toLowerCase().toString().includes(e.target.value.toLowerCase())
        );
        if (e.target.value === "") {
            this.setState({faculty: this.props.facultylist})
        }
        else {
            this.setState({faculty: newSearch});
        }
    }
    sort = (e) => {
        if (flag === 'asc') {
            var key = e.target.id;
            var myData = [].concat(this.state.faculty.sort((a, b) => a[key] > b[key]));
            this.setState({faculty: myData})
            flag = 'desc'
        }
        else if (flag === 'desc') {
            var key = e.target.id;
            var myData = [].concat(this.state.faculty.sort((a, b) => a[key] < b[key]));
            this.setState({
                faculty: myData
            })
            flag = 'asc'
        }
    }

    render() {
        let pages = [];
        let len = this.state.faculty.length;
        let page = Math.ceil(len / this.state.totalRecords)
        for (let i = 1; i <= page; i++) {
            pages.push(i);
        }
        let lastRec = this.state.curr * this.state.totalRecords;
        let firstRec = lastRec - this.state.totalRecords;
        let totalRec = this.state.faculty.slice(firstRec, lastRec);
        return (
            <div style={{"padding": "80px"}}>
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
                    <Button bsStyle="danger" onClick={this.toggle}>Register New Faculty</Button>
                </div>
                <br/><br/><br/>
                <div>
                    <Table striped bordered hover>
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
                            totalRec.map((faculty, i) => {
                                return (
                                    <tr>
                                        <td>{faculty.fullname}</td>
                                        <td>{faculty.email}</td>
                                        <td>{faculty.gender}</td>
                                        <td><img src={baseurl + '/upload/' + faculty.photo}/></td>

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
                    <Faculty_Form show={this.state.isActive} setStateFalse={this.setStateFalse.bind(this)}/>

                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        facultylist: state.FacultyReducer.facultyList
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({facultyList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Faculty);
