import React from 'react';
import {NavLink,Switch,Route,Redirect} from 'react-router-dom'
import {Navbar,NavItem,Nav,NavDropdown,MenuItem,Button} from 'react-bootstrap'
import Home from '../component/home'
import About from '../component/about'
import Login from '../component/login'
import Register from '../component/register'

import AdminDashboard from '../component/admin/dashboard'
import Student from '../component/admin/student'
import Faculty from '../component/admin/faculty'

import StudentDashboard from '../component/student/dashboard'
import Student_Profile from '../component/student/studentProfile'
import Event_List from '../component/student/eventList'

import Faculty_Dashboard from '../component/faculty/dashboard'
import facultyProfile from '../component/faculty/facultyProfile'
import Faculty_Student from '../component/faculty/student'
import Faculty_Event_List from '../component/faculty/eventList'


 import '../App.css'

import Logout from '../component/logout'

const Private=({...props})=>{
    return localStorage.getItem('token')?<div><Route {...props}/></div>
        :<Redirect to="/"/>
};
const Public = ({...props}) => {
    return !localStorage.getItem('token') || localStorage.getItem('token') ? <div><Route {...props}/>
        </div> :<Home/>
}

class Routes extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isActive:false,
        }
    }
    setStateFalse(){
        //console.log('called', val);
        this.setState({
            isActive:false
        })
    }
    toggle=()=>{
        this.setState({
            isActive:!this.state.isActive
        })
    }
    render(){
        return(
            <div>
                <div className="App-menu">
                    <p className="App-menu-item-email">{(localStorage.getItem('email'))?localStorage.getItem('email'):''}</p>
                    <NavLink className="App-menu-item" to="/about">About Us</NavLink>
                    {
                        (localStorage.getItem('type')==='admin')?
                            <div>
                                <NavLink className="App-menu-item" to="/admin/student">Student Management</NavLink>
                                <NavLink className="App-menu-item" to="/admin/faculty">Faculty Management</NavLink>
                            </div>

                            :''
                    }
                    {
                        (localStorage.getItem('type')==='student')?
                            <div>
                                <NavLink className="App-menu-item" to="/student/profile"> My Profile</NavLink>
                                <NavLink className="App-menu-item" to="/student/eventList">Events</NavLink>
                            </div>
                            :''
                    }
                    {
                        (localStorage.getItem('type')==='faculty')?
                            <div>
                                <NavLink className="App-menu-item" to="/faculty/profile"> My Profile</NavLink>
                                <NavLink className="App-menu-item" to="/faculty/student"> Student List</NavLink>
                                <NavLink className="App-menu-item" to="/faculty/event"> Event List</NavLink>


                            </div>
                            :''
                    }
                    {
                        !localStorage.getItem('token')?
                            <div>
                                <NavLink className="App-menu-item-email" to="/login">Sign In</NavLink>
                                <p className="App-menu-item-email" onClick={this.toggle}>Sign Up</p>
                            </div>
                            :
                            <div>
                                <NavLink className="App-menu-item-email" to="/logout">Sign Out</NavLink>
                            </div>
                    }
                </div>
                <br/>
                <br/>
                    <div>
                    <Switch>
                        <Public exact path="/" component={Home}/>
                        <Public exact path="/about" component={About}/>
                        <Public exact path="/register" component={Register}/>
                        <Public exact path="/login" component={Login}/>

                        <Private exact path="/admin/dashboard" component={AdminDashboard}/>
                        <Private exact path="/admin/student" component={Student}/>
                        <Private exact path="/admin/faculty" component={Faculty}/>

                        <Private exact path="/student/dashboard" component={StudentDashboard}/>
                        <Private exact path="/student/profile" component={Student_Profile}/>
                        <Private exact path="/student/eventList" component={Event_List}/>

                        <Private exact path="/faculty/dashboard" component={Faculty_Dashboard}/>
                        <Private exact path="/faculty/profile" component={facultyProfile}/>
                        <Private exact path="/faculty/student" component={Faculty_Student}/>
                        <Private exact path="/faculty/event" component={Faculty_Event_List}/>

                        <Private exact path="/logout" component={Logout}/>



                    </Switch>
                    <Register show={this.state.isActive} setStateFalse={this.setStateFalse.bind(this)}/>

                    </div>
            </div>
        )
    }
}
export default Routes