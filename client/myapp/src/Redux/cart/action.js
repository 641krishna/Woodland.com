import axios from "axios";
import {
    ADD_TO_CART_FAILURE,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    CHECKOUT_FAILURE,
    CHECKOUT_REQUEST,
    CHECKOUT_SUCCESS,
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

// GET CART PRODUCTS ACTION FUNCTIONS
export const getCartRequest = () => {
    return {
        type: GET_CART_REQUEST,
    };
};

export const getCartSuccess = (payload) => {
    return {
        type: GET_CART_SUCCESS,
        payload,
    };
};

export const getCartFailed = () => {
    return {
        type: GET_CART_FAILURE,
    };
};


// ADD CART PRODUCTS ACTION FUNCTIONS
export const addCartRequest = () => {
    return {
        type: ADD_TO_CART_REQUEST,
    };
};

export const addCartSuccess = (payload) => {
    return {
        type: ADD_TO_CART_SUCCESS,
        payload,
    };
};

export const addCartFailed = (payload) => {
    return {
        type: ADD_TO_CART_FAILURE,
        payload,
    };
};


// UPDATE CART PRODUCTS ACTION FUNCTIONS
export const updateCartRequest = () => {
    return {
        type: UPDATE_CART_REQUEST,
    };
};

export const updateCartSuccess = (payload) => {
    return {
        type: UPDATE_CART_SUCCESS,
        payload,
    };
};

export const updateCartFailed = (payload) => {
    return {
        type: UPDATE_CART_FAILURE,
        payload,
    };
};


// REMOVE CART PRODUCTS ACTION FUNCTIONS
export const removeCartRequest = () => {
    return {
        type: REMOVE_FROM_CART_REQUEST,
    };
};

export const removeCartSuccess = (payload) => {
    return {
        type: REMOVE_FROM_CART_SUCCESS,
        payload,
    };
};

export const removeCartFailed = (payload) => {
    return {
        type: REMOVE_FROM_CART_FAILURE,
        payload,
    };
};


// CHECKOUT CART PRODUCTS ACTION FUNCTIONS
export const checkoutRequest = () => {
    return {
        type: CHECKOUT_REQUEST,
    };
};

export const checkoutSuccess = (payload) => {
    return {
        type: CHECKOUT_SUCCESS,
        payload,
    };
};

export const checkoutFailed = (payload) => {
    return {
        type: CHECKOUT_FAILURE,
        payload,
    };
};


// EMPTY CART  ACTION FUNCTIONS
export const emptyCartRequest = (payload) => {
    return {
        type: EMPTY_CART_REQUEST,
        payload,
    };
};

export const emptyCartSuccess = (payload) => {
    return {
        type: EMPTY_CART_SUCCESS,
        payload,
    };
};

export const emptyCartFailed = (payload) => {
    return {
        type: EMPTY_CART_FAILURE,
        payload,
    };
};


// GET CART ITEMS FUNCTION
export const getCart = () => async (dispatch) => {
    dispatch(getCartRequest());
    try {
        const res = await axios.get(`http://localhost:8080/cart`, {
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        // console.log(res.data);
        return dispatch(getCartSuccess(res.data.cartItems));
    } catch (error) {
        // console.log(error.response);
    }
};


// ADD PRODUCT TO CART FUNCTION
export const addProductCart = (id, value) => async (dispatch) => {
    dispatch(addCartRequest());
    const body = JSON.stringify({
        productId: id,
        quantity: value,
    });
    try {
        const res = await axios.post(`http://localhost:8080/cart`, body, {
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        // dispatch(addCartSuccess(res.data));
        // console.log(res.data);

        return dispatch(addCartSuccess(res.data));
        // console.log(res.data);
    } catch (error) {
        return dispatch(addCartFailed(error.response.data));
        // console.log(error.response.data);
    }
};


// UPDATE PRODUCT TO CART FUNCTION
export const updateProductCart = (id, quantity) => async (dispatch) => {
    //   console.log(id, quantity);
    dispatch(updateCartRequest());
    const body = JSON.stringify({
        quantity: quantity,
    });
    try {
        const res = await axios.put(`http://localhost:8080/cart/${id}`, body, {
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        return dispatch(updateCartSuccess(res.data.updateditem));
        // console.log(res.data);
    } catch (error) {
        return dispatch(updateCartFailed(error.response));
        // console.log(error.response);
    }
};


// REMOVE PRODUCT FROM CART FUNCTION
export const removeProductCart = (id) => async (dispatch) => {
    dispatch(removeCartRequest());

    try {
        const res = await axios.delete(`http://localhost:8080/cart/${id}`, {
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        // console.log(res.data);
        return dispatch(removeCartSuccess(res.data));
    } catch (error) {
        // console.log(error.response);
        return dispatch(removeCartFailed(error.response));

    }
};


// CHECKOUT FUNCTION
export const checkoutPayment = (cartItems, id) => async (dispatch) => {
    // console.log(cartItems, id);
    const body = {
        cartItems,
        userId: id,
    };
    try {
        const res = await axios.post(
            `http://localhost:8080/checkout/create-checkout-session`,
            body
        );
        console.log(res.data);
        return dispatch(checkoutSuccess(res.data));
        
    } catch (error) {
        // console.log(error.response);
        return dispatch(checkoutFailed(error.response));
    }
};


// EMPTYCART FUNCTION
export const emptyCart = () => async (dispatch) => {
    dispatch(emptyCartRequest());
    try {
        const res = await axios.get(`http://localhost:8080/cart/emptycart`, {
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        // console.log(res);
        return dispatch(emptyCartSuccess(res.data));
    } catch (error) {
        // console.log(error);
        return dispatch(emptyCartSuccess(error.response));
    }
};