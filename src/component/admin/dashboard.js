import React from 'react';
import {BarChart} from 'react-easy-chart'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import {push} from 'react-router-redux'

import {totalFaculty,totalEvents,totalStudent} from '../../action/index'
class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dataDisplay:'',
            showToolTip:false,
            top:'',
            left:'',
            y:'',
            x:''
        }
    }
    componentWillMount(){
        this.props.totalFaculty();
        this.props.totalStudent();
        this.props.totalEvents();
    }
    mouseOverHandler=(d, e)=> {
        console.log('Arrya',d)
        console.log('.....',e)

        this.setState({
            showToolTip: true,
            top: `${e.screenY - 10}px`,
            left: `${e.screenX + 10}px`,
            y: d.y,
            x: d.x});
    }

    mouseMoveHandler=(e)=> {
        if (this.state.showToolTip) {
            this.setState({top: `${e.y - 10}px`, left: `${e.x + 10}px`});
        }
    }

    mouseOutHandler=()=> {
        this.setState({showToolTip: false});
    }
    render(){
        return(
            <div>
                <BarChart
                    axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                    axes
                    grid
                    colorBars
                    height="400"
                    width="400"
                    data={[
                        {x: 'Students', y: this.props.countStudent},
                        {x: 'Faculty', y: this.props.countFaculty},
                        {x: 'Events', y:this.props.countEvent},
                    ]}

                    mouseOverHandler={this.mouseOverHandler}
                    mouseOutHandler={this.mouseOutHandler}
                    mouseMoveHandler={this.mouseMoveHandler}
                    clickHandler={(d) => this.setState({dataDisplay: `The value on the ${d.x} is ${d.y}`})}

                    yDomainRange={[0, 100]}
                />
                <div style={{display: 'inline-block', verticalAlign: 'top', paddingLeft: '20px'}}>
                    {this.state.dataDisplay ? this.state.dataDisplay : 'Click on a bar to show the value'}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    debugger
    return{
        countFaculty:state.CountFacultyReducer.countFaculty,
        countStudent:state.CountStudentReducer.countStudent,
        countEvent:state.CountEventReducer.countEvent
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        totalFaculty,
        totalEvents,
        totalStudent,
    },dispatch)

}
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Dashboard));