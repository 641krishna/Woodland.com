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
} from "./actiontype";

const TOKEN = localStorage.getItem("token");
const intialState = {
    userRegister: { isLoading: false, isError: false, message: "" },
    userLogin: { isLoading: false, isError: false, message: "" },
    userLogout: { message: "" },
    data: {
        isAuthenticated: !!TOKEN,
        token: TOKEN,
        user: null,
    },
};

export const authReducer = (state = intialState, { type, payload }) => {
    // console.log(payload);
    switch (type) {
        case AUTH_REGISTER_REQUEST:
            return {
                ...state,
                userRegister: { isLoading: true, isError: false },
            };
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                userRegister: {
                    isLoading: false,
                    isError: false,
                    message: payload.message,
                },
            };
        case AUTH_REGISTER_FAILURE:
            return {
                ...state,
                userRegister: { isLoading: false, isError: true, message: payload },
            };
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                userLogin: { isLoading: true, isError: false },
            };
        case AUTH_LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                userLogin: {
                    isLoading: false,
                    isError: false,
                    message: payload.message,
                },
                data: {
                    isAuthenticated: true,
                    token: payload.token,
                    user: payload.userDetails,
                },
            };
        case AUTH_LOGIN_FAILURE:
            return {
                ...state,
                userLogin: { isLoading: false, isError: true, message: payload },
            };
        case AUTH_LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                userLogout: { message: "Logout Successfully" },
                data: {
                    isAuthenticated: false,
                    token: null,
                    user: null,
                },
            };
        case IS_AUTH_CHECK_SUCCESS:
            // localStorage.setItem("token", payload.token);

            return {
                ...state,
                userLogin: {
                    isLoading: false,
                    isError: false,
                    message: payload.message,
                },
                data: {
                    isAuthenticated: payload.isAuth,
                    token: payload.token,
                    user: payload.userDetails,
                },
            };

        default:
            return state;
    }
};