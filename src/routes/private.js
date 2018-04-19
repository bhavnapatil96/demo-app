import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { withRouter } from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {push} from 'react-router-redux'
import IdleTimer from 'react-idle-timer';
import {Modal} from 'react-bootstrap'
class Private extends React.Component{
    a=15000;
    b;
    constructor(props){
        super(props)
        this.state={
            timeout: 30000,
            isIdle: false,
            isActive:false,
        }
    }

    componentWillMount() {
        window.addEventListener('unload',this.logout);
    }
    logout=()=>{
        debugger
        this.props.goToLogout();
    }
    _onIdle=()=> {
        this.setState({
            isActive: !this.state.isActive,
            isIdle: true
        });
        if(this.state.isIdle){
            this.ModalTimeOut();
        }
    }
    ModalTimeOut = () => {
        debugger
        this.b = setTimeout(()=>{
            this.toggle()
        },this.a);
    }
    _onActive=()=>{
        this.setState({ isIdle: false});
        clearTimeout(this.b);
    }
    continueLogin=()=>{
        this._onActive()
        this.setState({
            isActive:!this.state.isActive
        })
        clearTimeout(this.b);
    }
    toggle=()=>{
        clearTimeout(this.b);
        this.setState({isActive:false });
        this.props.goToLogout();
    }
        render(){
        return(
            localStorage.getItem('token')?<div>
                    <Route {...this.props}/>
                    <IdleTimer
                        ref="idleTimer"
                        element={document}
                        activeAction={this._onActive}
                        idleAction={this._onIdle}
                        timeout={this.state.timeout}
                        startOnLoad={true}
                        format="MM-DD-YYYY HH:MM:ss.SSS">
                    </IdleTimer>
                    <Modal show={this.state.isActive}>
                        <Modal.Header>
                            <Modal.Title>Time Out</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Session will expire in 30 seconds..</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.continueLogin}>Continue</Button>
                            <Button onClick={this.toggle}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                :<Redirect to="/"/>
        )
    }
}

function matchDispatchToProps(dispatch) {
    debugger;
    return bindActionCreators({
        goToLogout: () =>push('/logout')
    },dispatch)
}
export default withRouter(connect(null,matchDispatchToProps)(Private));