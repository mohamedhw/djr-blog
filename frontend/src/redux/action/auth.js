import axios from "axios"
import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, CHECK_AUTH_SUCCESS, CHECK_AUTH_FAIL} from '../action/type'
import Cookies from 'js-cookie'
import process from "process";



export const checkauth = () => async dispatch =>{
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };
    try{
        const res = await axios.get('http://localhost:8000/checkauth/', config)
        if (res.data.error || res.data.isAuthenticated === 'error'){ 
            dispatch({
                type: CHECK_AUTH_FAIL,
                payload: false
            });
        }else if (res.data.isAuthenticated === 'success'){
            dispatch({
                type: CHECK_AUTH_SUCCESS,
                payload: true
            })
        }else{
            dispatch({
                type: CHECK_AUTH_FAIL,
                payload: false
            });
        }

    }
    catch(err) {
        dispatch({
            type: CHECK_AUTH_FAIL,
            payload: false
        });
    }
}

export const login = (username, password) => async dispatch =>{
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({username, password})
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api-login/`, body, config)
        if (res.data.success){
            dispatch({
                type:LOGIN_SUCCESS
            })
        }else{
            dispatch({
                type:LOGIN_FAIL
            })
        }
    }
    catch{
        dispatch({
            type:LOGIN_FAIL
        })
    }
}

export const logout = () => async dispatch =>{
    const config = {
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({
        "withCredentials": true
    })
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api-logout/`, body, config)
        if(res.data.success){
            dispatch({
                type:LOGOUT_SUCCESS,
                payload: res.data.username
            })
        }else{
            dispatch({
                type:LOGOUT_FAIL
            })
        }
    }
    catch{
        dispatch({
            type:LOGOUT_FAIL
        })
    }
}

export const register=(username, password, password2)=> async dispatch =>{
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({username, password, password2})
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api-register/`, body, config)
        if (res.data.success){
            dispatch({
                type: REGISTER_SUCCESS,
            });
        }else{
            dispatch({
                type: REGISTER_FAIL,
            });
        }
    }
    catch(error){
        dispatch({
            type: REGISTER_FAIL,
            payload: false
        })
    }

}