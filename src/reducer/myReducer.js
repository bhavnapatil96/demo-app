import * as Constant from '../constant/index';
const initialState={
    registerUser:[],
    loginUser:[],
    studentList:[],
    facultyList:[],
    faculty:{},
    eventList:[],
    event:{},
    countFaculty:'',
    countStudent:'',
    countEvent:''

}
export const RegisterReducer=(state=initialState,action)=>{
    switch (action.type){
        case Constant.REGISTER_USER:
            return{
                ...state,
                registerUser:action.payload
            }
        case Constant.REGISTER_USER_ERROR:
            return{
                ...state
            }
        default :
                return {...state}

    }
}
export const LoginReducer=(state=initialState,action)=>{
    switch (action.type){
        case Constant.LOGIN_USER:
            debugger
            return{
                ...state,
                loginUser:action.payload
            }
        case Constant.REGISTER_USER_ERROR:
            return{
                ...state
            }
        default :
            return {...state}

    }
}

export const StudentReducer=(state=initialState,action)=>{
    switch (action.type){
        case Constant.STUDENT_LIST:
            debugger
            return{
                ...state,
                studentList:action.payload
            }
        case Constant.STUDENT_LIST_ERROR:
            return{
                ...state
            }
        default :
            return {...state}

    }
}
export const FacultyReducer=(state=initialState,action)=>{
    switch (action.type){
        case Constant.FACULTY_LIST:
            debugger
            return{
                ...state,
                facultyList:action.payload
            }
        case Constant.FACULTY_LIST_ERROR:
            return{
                ...state
            }
        case Constant.ADD_FACULTY:
            debugger
            return{
                ...state,
                faculty:action.payload
            }
        default :
            return {...state}

    }
}
export const EventReducer=(state=initialState,action)=>{
    switch (action.type){
        case Constant.EVENT_LIST:
            return{
                ...state,
                eventList:action.payload
            }
        case Constant.ADD_EVENT:
            debugger;
            return  {...state,eventList:[...state.eventList,action.payload]}
        case Constant.DELETE_EVENT:
            debugger;
            let newEventList=state.eventList.filter((d)=>d._id!==action.payload._id)
            return{
                ...state,
                eventList:newEventList
            }
        case Constant.EDIT_EVENT:
            debugger;
            let index=state.eventList.findIndex((d)=>d._id===action.payload._id)
            state.eventList.splice(index,1)
            state.eventList.splice(index,0,action.payload);

            return{
                ...state,eventList:state.eventList}
        default :
            return {...state}

    }
}
export const CountFacultyReducer=(state=initialState,action)=>{
    switch (action.type){
        case Constant.COUNT_FACULTY:
            debugger
            return{
                ...state,
                countFaculty:action.payload.data
            }
        default :
            return {...state}

    }
}
export const CountStudentReducer=(state=initialState,action)=>{
    switch (action.type){
        case Constant.COUNT_STUDENT:
            debugger
            return{
                ...state,
                countStudent:action.payload.data
            }
        default :
            return {...state}

    }
}
export const CountEventReducer=(state=initialState,action)=>{
    switch (action.type){
        case Constant.COUNT_EVENTS:
            debugger
            return{
                ...state,
                countEvent:action.payload.data
            }
        default :
            return {...state}

    }
}
