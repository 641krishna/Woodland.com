import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { checkoutPayment } from "../Redux/cart/action";

const PayButton = ({ cartItems }) => {

    const { isLoading, isError, message, data } = useSelector((store) => {
        // console.log(store.auth.userLogin)
        return {
            isLoading: store.auth.userLogin.isLoading,
            isError: store.auth.userLogin.isError,
            message: store.auth.userLogin.message,
            data: store.auth.data,
        };
    }, shallowEqual);

    const dispatch = useDispatch();

    //   console.log(data.user);
    console.log(cartItems);

    const handleCheckOut = () => {
        let id = data.user.id;
        dispatch(checkoutPayment(cartItems, id))
            .then((res) => {
                console.log(res.payload.url);
                if (res.payload.url) {
                    window.location.href = res.payload.url;
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // console.log(cartItems);
    };
    return (
        <>
            <Button
                type="submit"
                backgroundColor="#2E3337"
                color="white"
                borderRadius={0}
                _hover={{ bg: "gray.800" }}
                fontSize="0.8rem"
                size="sm"
                onClick={() => handleCheckOut()}
            >
                CHECKOUT
            </Button>
        </>
    );

}

export default PayButton;