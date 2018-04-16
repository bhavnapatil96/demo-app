import React from 'react';
import {NavLink} from 'react-router-dom'
class AdminSidebar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <NavLink to="/admin/student">Student Management</NavLink>
                <NavLink to="/admin/faculty">Faculty Management</NavLink>
            </div>
        )
    }
}
export default AdminSidebar