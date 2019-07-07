import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
       idToken:token,
       userId:userId
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId')
    return{
        type: actionTypes.AUTH_LOGOUT
    }   
}
export const checkAuthTimeOut =(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime*1000);
    };
;}
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCbt3MOmqsVQOn5mGguUFmaMPOLosmXC7I';
        if (!isSignUp){
            url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCbt3MOmqsVQOn5mGguUFmaMPOLosmXC7I'
        }
        axios.post(url, authData)
            .then(ress=>{
                const expirationDate =new Date(new Date().getTime()+ress.data.expiresIn*1000)
                localStorage.setItem('token',ress.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',ress.data.localId);
                dispatch(authSuccess(ress.data.idToken,ress.data.localId));
                dispatch(checkAuthTimeOut(ress.data.expiresIn));
            }             
            )
            .catch(
                err => {
                    dispatch(authFail(err.response.data.error.message))
                }
            )
    };
};
export const setAuthRedirectPath = (path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}
export const authCheckState =()=>{
    return dispatch=>{
        const token =localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId =localStorage.getItem('userId')
                dispatch(authSuccess(token ,userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000));
            }else {      
                dispatch(logout());  
            }
        }
    }
}