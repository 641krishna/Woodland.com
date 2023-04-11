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

const initialState = {
    allProducts: { isLoading: false, isError: false },
    singleProduct: { isLoading: false, isError: false },
    addProduct: { isLoading: false, isError: false },
    updateProduct: { isLoading: false, isError: false },
    deleteProduct: { isLoading: false, isError: false },
    data: [],
    singleData: {},
};

export const productReducer = (state = initialState, { type, payload }) => {
    //   console.log(state, payload);
    switch (type) {
        case GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                allProducts: { isLoading: true, isError: false },
            };
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                allProducts: { isLoading: false, isError: false },
                data: payload,
            };
        case GET_ALL_PRODUCTS_FAILURE:
            return {
                ...state,
                allProducts: { isLoading: false, isError: true },
            };
        case GET_SINGLE_PRODUCT_REQUEST:
            return {
                ...state,
                singleProduct: { isLoading: true, isError: false },
            };
        case GET_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                singleProduct: { isLoading: false, isError: false },
                singleData: payload,
            };
        case GET_SINGLE_PRODUCT_FAILURE:
            return {
                ...state,
                singleProduct: { isLoading: false, isError: true },
            };
        case ADD_PRODUCT_REQUEST:
            return {
                ...state,
                addProduct: { isLoading: true, isError: false },
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                addProduct: { isLoading: false, isError: false },
                singleData: payload,
            };
        case ADD_PRODUCT_FAILURE:
            return {
                ...state,
                addProduct: { isLoading: false, isError: true },
            };
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                deleteProduct: { isLoading: true, isError: false },
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleteProduct: { isLoading: false, isError: false },
                singleData: payload,
            };
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                deleteProduct: { isLoading: false, isError: true },
            };

        //   case UPDATE_PRODUCT_REQUEST:
        //   return {
        //     ...state,
        //     updateProduct: { isLoading: true, isError: false },
        //   };
        // case UPDATE_PRODUCT_SUCCESS:
        //   return {
        //     ...state,
        //     updateProduct: { isLoading: false, isError: false },
        //     singleData: payload,
        //   };
        // case UPDATE_PRODUCT_FAILURE:
        //   return {
        //     ...state,
        //     updateProduct: { isLoading: false, isError: true },
        //   };


        default:
            return state;
    }
};