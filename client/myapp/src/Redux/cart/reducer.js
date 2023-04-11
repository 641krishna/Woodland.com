import {
    ADD_TO_CART_FAILURE,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    EMPTY_CART_FAILURE,
    EMPTY_CART_REQUEST,
    EMPTY_CART_SUCCESS,
    GET_CART_FAILURE,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    UPDATE_CART_FAILURE,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS,
} from "./actiontype";

const intialState = {
    carts: [],
    isLoading: false,
    isError: false,
    message: "",
};

export const cartReducer = (state = intialState, { type, payload }) => {
    // console.log((payload));
    switch (type) {
        case GET_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case GET_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                carts: payload,
            };
        case GET_CART_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case ADD_TO_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                carts: [...state.carts, payload],
            };
        case ADD_TO_CART_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: payload,
            };

        case UPDATE_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case UPDATE_CART_SUCCESS:
            let updatedCart = state.carts.map((el) => {
                if (el._id === payload.id) {
                    el.quantity = payload.quantity;
                    return el;
                }
                return el;
            });
            return {
                ...state,
                isLoading: false,
                isError: false,
                carts: updatedCart,
            };
        case UPDATE_CART_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case REMOVE_FROM_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case REMOVE_FROM_CART_SUCCESS:
            let filterCart = state.carts.filter((el) => el._id !== payload.id);
            return {
                ...state,
                isLoading: false,
                isError: false,
                carts: filterCart,
            };
        case REMOVE_FROM_CART_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case EMPTY_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case EMPTY_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                carts: [],
            };
        case EMPTY_CART_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            return state;
    }
};