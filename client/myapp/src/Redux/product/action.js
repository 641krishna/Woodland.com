import axios from "axios";
import {
    ADD_PRODUCT_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_SINGLE_PRODUCT_FAILURE,
    GET_SINGLE_PRODUCT_REQUEST,
    GET_SINGLE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
} from "./actiontype";

// GET ALL PRODUCTS ACTION FUNCTIONS

export const getAllProductsRequest = () => {
    return {
        type: GET_ALL_PRODUCTS_REQUEST,
    };
};

export const getAllProductsSuccess = (payload) => {
    return {
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload,
    };
};

export const getAllProductsFailure = () => {
    return {
        type: GET_ALL_PRODUCTS_FAILURE,
    };
};

// GET SINGLE PRODUCT ACTION FUNCTIONS

export const getSingleProductsRequest = () => {
    return {
        type: GET_SINGLE_PRODUCT_REQUEST,
    };
};

export const getSingleProductsSuccess = (payload) => {
    return {
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload,
    };
};

export const getSingleProductsFailure = () => {
    return {
        type: GET_SINGLE_PRODUCT_FAILURE,
    };
};

// ADD PRODUCT ACTION FUNCTIONS

export const addProductRequest = () => {
    return {
        type: ADD_PRODUCT_REQUEST,
    };
};

export const addProductSuccess = (payload) => {
    return {
        type: ADD_PRODUCT_SUCCESS,
        payload,
    };
};

export const addProductFailure = () => {
    return {
        type: ADD_PRODUCT_FAILURE,
    };
};

// DELETE PRODUCT ACTION FUNCTIONS

export const deleteProductRequest = () => {
    return {
        type: DELETE_PRODUCT_REQUEST,
    };
};

export const deleteProductSuccess = (payload) => {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        payload,
    };
};

export const deleteProductFailure = () => {
    return {
        type: DELETE_PRODUCT_FAILURE,
    };
};

// GET ALL Products Function
export const getAllProducts = (queryParams) => async (dispatch) => {
    dispatch(getAllProductsRequest());
    try {
        // console.log(queryParams);
        const res = await axios.get(`http://localhost:8080/product`, queryParams);
        console.log(res.data.Products)
        dispatch(getAllProductsSuccess(res.data.Products));
        // console.log(res);
        return res; //  for multiple instances of same component
    } catch (error) {
        dispatch(getAllProductsFailure());
    }
};



// GET SINGLE PRODUCT FUNCTION
export const getSingleProduct = (id) => async (dispatch) => {
    // console.log(id);
    dispatch(getSingleProductsRequest());
    try {
        const res = await axios.get(`http://localhost:8080/product/${id}`);
        // console.log(res.data.Products)
        dispatch(getSingleProductsSuccess(res.data.Products));
    } catch (error) {
        dispatch(getSingleProductsFailure());
    }
};

// ADD PRODUCT  FUNCTION
export const addProduct = (data) => async (dispatch) => {
    // console.log(data);
    dispatch(addProductRequest());
    try {
        const res = await axios.post(`http://localhost:8080/product`, data, {
            headers: {
                token: "1232465648484554646",
                "Content-Type": "application/json",
            },
        });
        // console.log(res.data);
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        dispatch(addProductFailure());
    }
};


// DELETE PRODUCT FUNCTION
export const deleteProduct = (id) => async (dispatch) => {
    // console.log(data);
    dispatch(deleteProductRequest());
    try {
        const res = await axios.delete(`http://localhost:8080/product/${id}`, {
            headers: {
                // token: localStorage.getItem("token"),
                token: "1232465648484554646",
                "Content-Type": "application/json",
            },
        });
        // console.log(res.data);
        dispatch(deleteProductSuccess(res.data));
    } catch (error) {
        dispatch(deleteProductFailure());
    }
};

export const getSliderProducts = async (query) => {
    try {
      let q = "";
      for (let key in query) {
        q += `${key}=${query[key]}&`;
      }
      // console.log(q);
      const res = await axios.get(`http://localhost:8080/product?${q}`);
      // console.log(res.data.Products)
  
      return res; //  for multiple instances of same component
    } catch (error) {
      return error;
    }
  };