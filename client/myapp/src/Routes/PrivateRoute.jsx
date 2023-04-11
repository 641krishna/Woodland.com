import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { shallowEqual, useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const { data } = useSelector((store) => {
        return {
            isLoading: store.auth.userLogin.isLoading,
            isError: store.auth.userLogin.isError,
            message: store.auth.userLogin.message,
            data: store.auth.data,
        };
    }, shallowEqual);

    if (!data.isAuthenticated) {
        return <Navigate to='/login' state={{ from: location.pathname }} replace />
    }
    return children;
}

export default PrivateRoute;