import {combineReducers} from 'redux'
import {RegisterReducer,LoginReducer,StudentReducer,EventReducer,FacultyReducer,CountFacultyReducer,CountEventReducer,CountStudentReducer} from './myReducer'
const allReducers=combineReducers({
    RegisterReducer,
    LoginReducer,
    StudentReducer,
    FacultyReducer,
    EventReducer,
    CountFacultyReducer,
    CountEventReducer,
    CountStudentReducer,



})
export default allReducers