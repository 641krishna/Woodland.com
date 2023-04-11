import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import CartPage from '../Pages/CartPage';
import SignupPage from '../Pages/SignupPage';
import ProductsPage from '../Pages/ProductsPage';
import SingleProductPage from '../Pages/SingleProductPage';
import MyAccount from '../Pages/MyAccount';
import AboutMe from '../Pages/AboutMe';
import ErrorPage from '../Pages/ErrorPage';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login'
                element={
                    <LoginPage />
                }>
            </Route>
            <Route path='/signup'
                element={
                    <SignupPage />
                }>
            </Route>
            <Route path='/cart'
                element={
                    <CartPage />
                }>
            </Route>
            <Route path='/products' element={<ProductsPage />}></Route>
            <Route path='/products/:id' element={<SingleProductPage />}></Route>

            <Route path='/account' element={<MyAccount />}></Route>
            <Route path='/aboutme' element={<AboutMe />}></Route>

            <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
    )
}

export default AllRoutes;