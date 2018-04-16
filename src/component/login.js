import React, { Component } from 'react';
import {LoginUser} from '../action/index';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import '../login.css'
let InvalidMessage=''
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            user:{}
        }
    }
    handleChange=(e)=>{
        const {value,name}=e.target
        const user=this.state
        user[name]=value
        this.setState({
            user
        },()=>{console.log('state ',this.state.user)})
    }
    login=(e)=>{
        e.preventDefault();
        this.props.LoginUser(this.state.user).then((success)=>{
            debugger;
            if(localStorage.getItem('type')==='admin'){
                console.log(success)
                this.props.history.push('/admin/dashboard');
            }
            else if(localStorage.getItem('type')==='student'){
                console.log(success)
                this.props.history.push('/student/dashboard');
            }
            else if(localStorage.getItem('type')==='faculty'){
                console.log(success)
                this.props.history.push('/faculty/dashboard');
            }
            else{
                alert('Invalid Email or Password...')
            }

        }).catch((error)=>{
            alert(error)
        })
    }
    render() {
        return (
            <section>
                <div id="login" className="container">
                    <div className="card card-container">
                        <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                        <p id="profile-name" className="profile-name-card"></p>
                        <form className="form-signin" onSubmit={this.login}>
                            <span style={{"color":"red"}} id="reauth-email" className="reauth-email">{InvalidMessage}</span>
                            <input required="true" name="email" onChange={this.handleChange} type="email" id="txtemail" className="form-control" placeholder="Email address"  autofocus/>
                            <input required="true" name="password" onChange={this.handleChange} type="password" id="txtpassword" className="form-control" placeholder="Password"/>
                            <button style={{"backgroundColor":"rebeccapurple","color":"white"}} className="btn btn-lg  btn-block btn-signin" type="submit">Sign in</button>
                        </form>

                    </div>
                </div>
            </section>
        );
    }
}
function mapStateToProps(state) {
    return{
        loginUser:state.loginUser,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({LoginUser},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
