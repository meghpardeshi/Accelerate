import {
    USER_LOGIN_LOADING_TOGGLE,
    USER_LOGIN_NETWORK_ACCESS_SUCCESS, 
    USER_LOGIN_NETWORK_ACCESS_FAILURE
} from '../types/auth';

export function userLogin (email, password) {
    return(dispatch) => {
        dispatch(loading(true));
        return fetch('/api/auth/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res=> {
            if(res.status === 200) {
                return res.json().then(res=>{
                    dispatch(loading(false));
                    dispatch(isSuccess(res));
                })
            } else {
                dispatch(loading(false));
                return res.json().then(res=> {
                    dispatch(isError(res));
                })
            }
        }).catch(error=> {
            dispatch(loading(false));
            dispatch(isError(error));
        })
    }
}

export function loading(loading) {
    return {
        type: USER_LOGIN_LOADING_TOGGLE,
        payload: loading
    }
}

export function isSuccess(success) {
    return {
        type: USER_LOGIN_NETWORK_ACCESS_SUCCESS,
        payload: success
    }
}

export function isError(err) {
    return {
        type: USER_LOGIN_NETWORK_ACCESS_FAILURE,
        payload: err
    }
}