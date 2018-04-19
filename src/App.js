import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap'
import { withRouter } from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {push} from 'react-router-redux'
import './App.css';
import Routes from "./routes/index";
import IdleTimer from 'react-idle-timer';
class App extends Component {
    // a=5000;
    // b;
    // constructor(props){
    //     super(props)
    //     this.state={
    //         timeout: 9000,
    //         remaining: null,
    //         isIdle: false,
    //         lastActive: null,
    //         elapsed: null,
    //         isActive:false,
    //     }
    // }
    // componentDidMount() {
    //     debugger
    //     this.setState({
    //         remaining: this.refs.idleTimer.getRemainingTime(),
    //         lastActive: this.refs.idleTimer.getLastActiveTime(),
    //         elapsed: this.refs.idleTimer.getElapsedTime()
    //     });
    //
    //     setInterval(() => {
    //         this.setState({
    //             remaining: this.refs.idleTimer.getRemainingTime(),
    //             lastActive: this.refs.idleTimer.getLastActiveTime(),
    //             elapsed: this.refs.idleTimer.getElapsedTime()
    //         });
    //     }, 1000);
    // }
    // _onIdle=()=> {
    //     this.setState({
    //         isActive: !this.state.isActive
    //     });
    //     this.ModalTimeOut();
    // }
    // ModalTimeOut = () => {
    //     this.b = setTimeout(()=>{
    //         this.toggle()
    //     },this.a);
    // }
    // _onActive=()=>{
    //     this.setState({ isIdle: false });
    //     clearTimeout(this.a);
    // }
    // toggle=()=>{
    //    clearTimeout(this.b);
    //    this.setState({isActive:false });
    //    this.props.goToLogout();
    // }
    // _reset = () => {
    //     this.refs.idleTimer.reset();
    // }
    render() {
    return (
          <div className="App-Content">
              <Routes/>
              {/*<IdleTimer*/}
                  {/*ref="idleTimer"*/}
                  {/*element={document}*/}
                  {/*activeAction={this._onActive}*/}
                  {/*idleAction={this._onIdle}*/}
                  {/*timeout={this.state.timeout}*/}
                  {/*startOnLoad={true}*/}
                  {/*format="MM-DD-YYYY HH:MM:ss.SSS">*/}
                  {/*<div>*/}
                      {/*<h6>Timeout: {this.state.timeout}ms</h6>*/}
                      {/*<h6>Time Remaining: {this.state.remaining}</h6>*/}
                      {/*<h6>Time Elapsed: {this.state.elapsed}</h6>*/}
                      {/*<h6>Last Active: {this.state.lastActive}</h6>*/}
                      {/*<h6>Idle: {this.state.isIdle.toString()}</h6>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                      {/*<button onClick={this._reset}>RESET</button>*/}
                      {/*<button onClick={this._pause}>PAUSE</button>*/}
                      {/*<button onClick={this._resume}>RESUME</button>*/}
                  {/*</div>*/}
              {/*</IdleTimer>*/}
              {/*<Modal show={this.state.isActive}>*/}
                      {/*<Modal.Header>*/}
                          {/*<Modal.Title>Time Out</Modal.Title>*/}
                      {/*</Modal.Header>*/}
                      {/*<Modal.Body>*/}
                          {/*<h4>Session will expire in 30 seconds..</h4>*/}
                      {/*</Modal.Body>*/}
                      {/*<Modal.Footer>*/}
                          {/*<Button onClick={this._reset}>Continue</Button>*/}
                          {/*<Button onClick={this.toggle}>Close</Button>*/}
                      {/*</Modal.Footer>*/}
                  {/*</Modal>*/}
          </div>
    );
  }
}
function mapStateToProps(state) {
    debugger
    return{
    }
}
function matchDispatchToProps(dispatch) {
    debugger;
    return bindActionCreators({
        goToLogout: () => push('/logout')
    },dispatch)
}
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(App));

