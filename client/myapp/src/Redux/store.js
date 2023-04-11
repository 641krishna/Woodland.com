import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { cartReducer } from "./cart/reducer";
import { productReducer } from "./product/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    carts: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);