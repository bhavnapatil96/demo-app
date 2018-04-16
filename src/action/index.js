import baseurl from '../config/baseurl'
import * as Constant from '../constant/index'
const axios=require('axios')
export const registerUser=(obj)=>{
    console.log('Form Data action',obj)

    return ((dispatch)=>{
        debugger
        return axios.post('http://localhost:5000/api/users/add',obj).then((success)=>{
            dispatch({
                type:Constant.REGISTER_USER,
                payload:success.data
            })
            return 'success'
        }).catch((error)=>{
            dispatch({
                type:Constant.REGISTER_USER_ERROR,
                payload:error.response.data
            })
            return error;
        })
    })
}
export const registerFaculty=(obj)=>{
    return ((dispatch)=>{
        debugger
        return axios.post('http://localhost:5000/api/users/add',obj).then((success)=>{
            dispatch({
                type:Constant.ADD_FACULTY,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            return error;
        })
    })
}

export const LoginUser=(obj)=>{
    return ((dispatch)=>{
        debugger
        return axios.post('http://localhost:5000/api/users/loginp',obj).then((success)=>{
            dispatch({
                type:Constant.LOGIN_USER,
                payload:success.data
            })
            localStorage.setItem('type',success.data.usertype)
            localStorage.setItem('email',success.data.email)
            localStorage.setItem('token',success.headers["x-auth"])
            return success.data
        }).catch((error)=>{
            dispatch({
                type:Constant.LOGIN_USER_ERROR,
                payload:error.response.data
            })
            return error;
        })
    })
}

export const studentList=()=>{
    const api={
        method:"get",
        url:"http://localhost:5000/api/student/list",
        headers:{
            'x-auth': localStorage.getItem('token')
        }
    };
    return ((dispatch)=>{
        debugger

        return axios(api).then((success)=>{
            dispatch({
                type:Constant.STUDENT_LIST,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            dispatch({
                type:Constant.STUDENT_LIST_ERROR,
                payload:error.response.data
            })
            return error;
        })
    })
}
export const facultyList=()=>{
    const api={
        method:"get",
        url:"http://localhost:5000/api/faculty/list",
        headers:{
            'x-auth': localStorage.getItem('token')
        }
    };
    return ((dispatch)=>{
        debugger

        return axios(api).then((success)=>{
            dispatch({
                type:Constant.FACULTY_LIST,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            dispatch({
                type:Constant.FACULTY_LIST_ERROR,
                payload:error.response.data
            })
            return error;
        })
    })
}

export const eventList=()=>{
    const api={
        method:"get",
        url:"http://localhost:5000/api/events/list",
        headers:{
            'x-auth': localStorage.getItem('token')
        }
    };
    return ((dispatch)=>{
        debugger

        return axios(api).then((success)=>{
            dispatch({
                type:Constant.EVENT_LIST,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            return error;
        })
    })
}
export const addEvent=(obj)=>{
    const api={
        method:"post",
        url:"http://localhost:5000/api/events/add",
        data:obj,
        headers:{
            'x-auth': localStorage.getItem('token')
        }
    };
    return ((dispatch)=>{
        debugger;
        return axios(api).then((success)=>{
            dispatch({
                type:Constant.ADD_EVENT,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            return error;
        })
    })
}
export const deleteEvent=(obj)=>{
    const api={
        method:"delete",
        url:"http://localhost:5000/api/events/delete",
        data:obj,
        headers:{
            'x-auth': localStorage.getItem('token')
        }
    };
    return ((dispatch)=>{
        debugger;
        return axios(api).then((success)=>{
            dispatch({
                type:Constant.DELETE_EVENT,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            return error;
        })
    })
}
export const editEvent=(obj)=>{
    const api={
        method:"post",
        url:"http://localhost:5000/api/events/update",
        data:obj,
        headers:{
            'x-auth': localStorage.getItem('token')
        }
    };
    return ((dispatch)=>{
        debugger;
        return axios(api).then((success)=>{
            debugger;
            dispatch({
                type:Constant.EDIT_EVENT,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            return error;
        })
    })
}

export const totalFaculty=()=>{
    return ((dispatch)=>{
        debugger
        const api={
            method:"get",
            url:"http://localhost:5000/api/faculty/count",
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        };
        return axios(api).then((success)=>{
            dispatch({
                type:Constant.COUNT_FACULTY,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            return error;
        })
    })
}
export const totalStudent=()=>{
    return ((dispatch)=>{
        debugger
        const api={
            method:"get",
            url:"http://localhost:5000/api/student/count",
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        };
        return axios(api).then((success)=>{
            debugger;
            dispatch({
                type:Constant.COUNT_STUDENT,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            return error;
        })
    })
}
export const totalEvents=()=>{
    return ((dispatch)=>{
        debugger
        const api={
            method:"get",
            url:"http://localhost:5000/api/event/count",
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        };
        return axios(api).then((success)=>{
            dispatch({
                type:Constant.COUNT_EVENTS,
                payload:success.data
            })
            return success.data
        }).catch((error)=>{
            return error;
        })
    })
}