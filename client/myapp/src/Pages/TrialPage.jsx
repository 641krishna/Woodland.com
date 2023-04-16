import { Button } from "@chakra-ui/react";

import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../Redux/cart/action";

const Trial = () => {
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

  const handleClick = () => {
    dispatch(emptyCart());
  };

  //   console.log(isLoading, isError, message, data);
  return <Button onClick={() => handleClick()}>Click</Button>;
};

export default Trial;