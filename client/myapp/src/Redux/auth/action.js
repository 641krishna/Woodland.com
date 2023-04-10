import axios from "axios";
import {
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_REGISTER_FAILURE,
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS,
    IS_AUTH_CHECK_FAILURE,
    IS_AUTH_CHECK_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
} from "./actiontype";

// REGISTERATION ACTION FUNCTIONS
export const registerRequest = () => {
    return {
        type: AUTH_REGISTER_REQUEST,
    };
};
export const registerSuccess = (payload) => {
    return {
        type: AUTH_REGISTER_SUCCESS,
        payload,
    };
};
export const registerFailed = (payload) => {
    return {
        type: AUTH_REGISTER_FAILURE,
        payload,
    };
};

// LOGIN ACTION FUNCTIONS

export const loginRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST,
    };
};
export const loginSuccess = (payload) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload,
    };
};
export const loginFailed = (payload) => {
    return {
        type: AUTH_LOGIN_FAILURE,
        payload,
    };
};

// LOGOUT ACTION FUNCTION

export const logoutSuccess = () => {
    return {
        type: AUTH_LOGOUT,
    };
};

// ISAUTHCHECK ACTION FUNCTION

export const isAuthSuccess = (payload) => {
    return {
        type: IS_AUTH_CHECK_SUCCESS,
        payload,
    };
};

export const isAuthFailure = (payload) => {
    return {
        type: IS_AUTH_CHECK_FAILURE,
        payload,
    };
};

// ISAUTHCHECK ACTION FUNCTION

export const forgotPassSuccess = (payload) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload,
    };
};

export const forgotPassFailure = (payload) => {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload,
    };
};

// REGISTERATION FUNCTION
export const authRegister = (data) => async (dispatch) => {
    // console.log(data);
    dispatch(registerRequest());
    try {
        const res = await axios.post(`http://localhost:8080/user/register`, data);
        // console.log(res.data);
        return dispatch(registerSuccess(res.data));
    } catch (error) {
        // console.log(error.response.data);
        return dispatch(registerFailed(error.response.data));
    }
};

// LOGIN FUNCTION
export const authLogin = (data) => async (dispatch) => {
    // console.log(data);

    dispatch(loginRequest());
    try {
        const res = await axios.post(`http://localhost:8080/user/login`, data);
        // console.log(res.data);
        return dispatch(loginSuccess(res.data));
    } catch (error) {
        // console.log(error.response.data);
        return dispatch(loginFailed(error.response.data));
    }
};

// LOGOUT FUNCTION
export const authLogout = () => (dispatch) => {
    return dispatch(logoutSuccess());
};

// ISAUTHCHECK FUNCTION
export const isAuthCheck = () => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:8080/user/isauth`, {
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        console.log(res.data);
        return dispatch(isAuthSuccess(res.data));
    } catch (error) {
        console.log(error.response);
        return dispatch(isAuthFailure(error.response.data));
    }
};


// FORGOT PASSWORD

export const forgotPassword = (body) => async (dispatch) => {
    // console.log(body);

    try {
        const res = await axios.put(`http://localhost:8080/user/resetpassword`, body);
        return dispatch(forgotPassSuccess(res.data));
        // console.log(res.data);
    } catch (error) {
        return dispatch(forgotPassFailure(error.response.data));
        // console.log(error.response);
    }
}