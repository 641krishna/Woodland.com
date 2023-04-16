import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  useColorMode,
  Image,
  Divider,
  Checkbox,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  addProductCart,
  getCart,
  removeProductCart,
  updateProductCart,
} from "../Redux/cart/action";
import { Navigate, useNavigate } from "react-router-dom";
import { AddIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import PayButton from "../Components/PayButton";

const CartPage = () => {
  const [checked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { isLoading, isError, data, message } = useSelector((store) => {
    // console.log(store.carts.message);
    return {
      message: store.carts.message.message,
      isLoading: store.carts.isLoading,
      isError: store.carts.isError,
      data: store.carts.carts,
    };
  }, shallowEqual);

  // console.log(data);

  const dispatch = useDispatch();

  let TotalPrice =
    data.length > 0 &&
    data
      ?.map((el) => {
        return el.productId.price * el.quantity;
      })
      .reduce((ac, el) => {
        return ac + el;
      });



  const removeProdCart = (id) => {
    dispatch(removeProductCart(id)).then(() => {
      dispatch(getCart());
    });
  };
  const updateProdCart = (id, quantity, value) => {
    if (value == "Add") {
      quantity = quantity + 1;
    } else {
      quantity = quantity - 1;
    }
    // console.log(id, quantity, value);

    dispatch(updateProductCart(id, quantity)).then(() => {
      dispatch(getCart());
    });

    // dispatch(getCart())
  };
  return (
    <>
      <Flex
        w={["98%", "95%", "85%", "60%"]}
        margin="auto"
        flexDirection="column"
        fontFamily="Montserrat"
        mt="1.7rem"
        gap="1.5rem"
      >
        <Box fontSize="0.75rem" color="darkred">
          <Text>For a short time only: free shipping on all orders</Text>
        </Box>
        <Box textAlign="left" fontSize="0.85rem">
          <Text>YOUR SHOPPING BAG</Text>
        </Box>
        <Box
        >
          {data.length < 1 && (
            <Box mt="3rem">
              <p>There are currently no items in your cart.</p>

              <Button
                as={"a"}
                backgroundColor="#2E3337"
                color="white"
                borderRadius={0}
                _hover={{ bg: "gray.600" }}
                mt="3rem"
                variant={"link"}
                href="/products"
                p="1rem"
              >
                CONTINUE SHOPPING
              </Button>
            </Box>
          )}

          {/* CART TABLE TITLES START */}

          <Divider
            my="2rem"
            display={{ base: "none", md: "flex", lg: "flex" }}
          />
          {data.length > 0 && (
            <Box
              mt="1.5rem"
              // border="1px purple solid"
              display={{ base: "none", md: "flex", lg: "flex" }}
            >
              <Box
                w={{ base: "20%", md: "10%", lg: "10%" }}
              // border="1px red solid"
              ></Box>
              {/* Details And button */}
              <Box
                display="flex"
                w={{ base: "80%", md: "90%", lg: "90%" }}
                // border="1px green solid"
                pl="1rem"
                flexDirection={{ base: "column", md: "row", lg: "row" }}
              >
                {/* Left Details */}
                <Box
                  display="flex"
                  textAlign="left"
                  // border="1px blue solid"
                  w={{ base: "90%", md: "50%", lg: "50%" }}
                  h="100%"
                  flexDirection="column"
                  justifyContent="space-between"
                ></Box>
                {/* RIGHTSIDE */}
                <Box
                  w={{ base: "90%", md: "50%", lg: "50%" }}
                  display="flex"
                  justifyContent="space-between"
                // border="1px green solid"
                >
                  <Box
                    w="30%"
                    // border="1px green solid"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      fontSize={{
                        base: "0.8rem",
                        md: "0.85rem",
                        lg: "0.85rem",
                      }}
                      fontWeight="500"
                    >
                      {" "}
                      Price
                    </Text>
                  </Box>
                  <Box
                    w="30%"
                    // border="1px green solid"
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <Text
                      fontSize={{
                        base: "0.8rem",
                        md: "0.85rem",
                        lg: "0.85rem",
                      }}
                      fontWeight="500"
                    >
                      {" "}
                      Quantity
                    </Text>
                  </Box>
                  <Box
                    w="30%"
                    // border="1px green solid"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      fontSize={{
                        base: "0.8rem",
                        md: "0.85rem",
                        lg: "0.85rem",
                      }}
                      fontWeight="500"
                    >
                      {" "}
                      Subtotal
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {/* CART TABLE TITLES END */}

          <Box
          // border="1px red solid"
          >
            {data.length > 0 &&
              data.map((el) => (
                <Box key={el._id}>
                  {/* ImagesBox */}
                  <Divider key={el._id} my="2rem" />
                  <Box
                    display="flex"
                    mt="1.5rem"
                  // border="1px purple solid"
                  >
                    <Box
                      w={{ base: "20%", md: "10%", lg: "10%" }}
                    // border="1px red solid"
                    >
                      <Image src={el.productId.images.split('|')[0]} />
                    </Box>
                    {/* Details And button */}
                    <Box
                      display="flex"
                      w={{ base: "80%", md: "90%", lg: "90%" }}
                      // border="1px green solid"
                      pl="1rem"
                      flexDirection={{ base: "column", md: "row", lg: "row" }}
                    >
                      {/* Left Details */}
                      <Box
                        display="flex"
                        textAlign="left"
                        // border="1px blue solid"
                        w={{ base: "90%", md: "50%", lg: "50%" }}
                        h="100%"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Text mb="0.2rem" fontSize="0.85rem" fontWeight="500">
                          {el.productId.brand}
                        </Text>
                        <Text mb="0.2rem" fontSize="0.7rem">
                          {el.productId.title}
                        </Text>
                        <Text mb="0.2rem" fontSize="0.7rem">
                          {`Size: ${el.productId.size}`}
                        </Text>
                        <Text mb="0.2rem" fontSize="0.7rem">
                          {`Item No: ${el.productId.id}`}
                        </Text>
                      </Box>
                      {/* RIGHTSIDE */}
                      <Box
                        w={{ base: "90%", md: "50%", lg: "50%" }}
                        display="flex"
                        justifyContent="space-between"
                        my={{ base: "0.5rem", md: "0", lg: "0" }}
                      >
                        <Box
                          w="30%"
                          // border="1px green solid"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text
                            fontSize={{
                              base: "0.8rem",
                              md: "1rem",
                              lg: "1rem",
                            }}
                          >{`\u20B9 ${el.productId.price}`}</Text>
                        </Box>
                        <Box
                          w="30%"
                          // border="1px green solid"
                          display="flex"
                          justifyContent="space-evenly"
                          alignItems="center"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            borderRadius="none"
                            fontSize="0.5rem"
                            p="0rem"
                            color="black"
                            _hover={{
                              bg: "lightgray",
                              color: "black",
                            }}
                            onClick={() =>
                              updateProdCart(el._id, el.quantity, "Add")
                            }
                          >
                            <AddIcon p="0rem" />
                          </Button>
                          <Text
                            px="0.5rem"
                            fontSize={{
                              base: "0.8rem",
                              md: "1rem",
                              lg: "1rem",
                            }}
                          >
                            {el.quantity}
                          </Text>
                          <Button
                            variant="outline"
                            size="sm"
                            borderRadius="none"
                            fontSize="0.5rem"
                            p="0rem"
                            color="black"
                            _hover={{
                              bg: "lightgray",
                              color: "black",
                            }}
                            onClick={() =>
                              updateProdCart(el._id, el.quantity, "Sub")
                            }
                            disabled={el.quantity <= 1}
                          >
                            <MinusIcon />
                          </Button>
                        </Box>
                        <Box
                          w="30%"
                          // border="1px green solid"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text
                            fontSize={{
                              base: "0.8rem",
                              md: "1rem",
                              lg: "1rem",
                            }}
                          >{`\u20B9 ${el.productId.price * el.quantity
                            }`}</Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    w="100%"
                    display="flex"
                    justifyContent="flex-end"
                    mt="0.5rem"
                  >
                    <Box
                      w={{ base: "80%", md: "90%", lg: "90%" }}
                      // border="1px purple solid"
                      display="flex"
                      pl="1rem"
                    >
                      <Button
                        // size="sm"
                        borderRadius="none"
                        colorScheme="gray"
                        fontSize="0.7rem"
                        w="auto"
                        h="auto"
                        p="0.5rem"
                        leftIcon={<CloseIcon fontSize="0.6rem" />}
                        onClick={() => removeProdCart(el._id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>

        <Divider />
        {data.length > 0 && (
          <Box
            display="flex"
          // border="1px red solid"
          >
            <Box
              w={{ base: "20%", md: "10%", lg: "10%" }}
            // border="1px blue solid"
            >
              {/* EMpty SPACe */}
            </Box>
            <Box
              w={{ base: "72%", md: "90%", lg: "90%" }}
              // border="1px blue solid"
              display="flex"
              justifyContent="flex-end"
            >
              <Box
                w={{ base: "90%", md: "50%", lg: "50%" }}
                display="flex"
                justifyContent="flex-end"
                gap="1rem"
              >
                <Box
                  w="30%"
                  // border="1px blue solid"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize={{ base: "0.7rem", md: "0.8rem", lg: "0.9rem" }}
                    fontWeight={500}
                  >
                    Grand Total :
                  </Text>
                </Box>
                <Box
                  w="30%"
                // border="1px blue solid"
                >
                  <Text
                    fontSize={{ base: "0.8rem", md: "1rem", lg: "1.3rem" }}
                    fontWeight={500}
                  >
                    {`\u20B9 ${TotalPrice} /-`}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        <Divider />
        <Box my="2.5rem" display="flex">
          {data.length >= 1 && (
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDirection="column"
              w="100%"
            >
              <Checkbox
                colorScheme="green"
                fontWeight={500}
                isChecked={checked}
                onChange={() => setIsChecked(!checked)}
                mb="1rem"

              >
                <Alert
                  status={checked == true ? "success" : "info"}
                  fontSize="0.8rem"
                  borderRadius="1rem"
                >
                  <AlertIcon />
                  <AlertTitle>
                    {checked == true ? "WELL DONE" : "IMPORTANT"}
                  </AlertTitle>
                  <AlertDescription>
                    {checked == true
                      ? "Please Proceed to Checkout."
                      : "Please read and then Proceed to Checkout."}
                  </AlertDescription>
                </Alert>
              </Checkbox>
              <Box fontSize="0.8rem">
                {" "}
                <Text textAlign="left">
                  During transaction you can use any{" "}
                  <Link
                    fontWeight={600}
                    href="https://stripe.com/docs/testing#cards"
                    target="_blank"
                  >
                    Stripe Testing Card details
                  </Link>{" "}
                </Text>
                <ul>
                  <Text textAlign="left" my="0.5rem">
                    When testing interactively, use a card number, such as 4242
                    4242 4242 4242. Enter the card number in the Dashboard or in
                    any payment form.
                    <li>&#9900; Use a valid future date, such as 12/34.</li>
                    <li>
                      &#9900; Use any three-digit CVC (four digits for American
                      Express cards).
                    </li>
                    <li>
                      &#9900; Use any value you like for other form fields.
                    </li>
                  </Text>
                </ul>
              </Box>
            </Box>
          )}
        </Box>
        <Box my="2.5rem" display="flex">
          {data.length >= 1 && (
            <Box display="flex" justifyContent="space-between" w="100%">
              <Button
                colorScheme="blue"
                borderRadius={0}
                bg="#EDEEEE"
                border="1px"
                borderColor="#2E3337"
                color="#2E3337"
                _hover={{ bg: "#D1D2D5", color: "#2E3337" }}
                size="sm"
                onClick={() => navigate("/")}
                fontSize="0.8rem"
              >
                CONTINUE SHOPPING
              </Button>
              {/* CHECKOUT BUTTON */}
              <PayButton cartItems={data} />
            </Box>
          )}
        </Box>

        {/* CONTACT INFO SECTION */}
        <Divider />
        <Box
          my="2rem"
          margin="auto"
          // border="1px red solid"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            w="100%"
          // border="1px red solid"
          >
            <Text fontSize="0.8rem">
              You can also place your order via telephone.
            </Text>
          </Box>
          <Box
            w="100%"
            display="flex"
            flexDirection={{ base: "column", md: "row", lg: "row" }}
            justifyContent={{
              base: "center",
              md: "space-between",
              lg: "space-between",
            }}
            margin="auto"
            my="2rem"
          // border="1px blue solid"
          >
            <Box
              w={{ base: "80%", md: "45%", lg: "45%" }}
              border="thin lightgray solid"
              p="0.5rem"
              margin="auto"
              mt="0.5rem"
            >
              <Text fontSize="0.8rem" fontWeight={500} my="0.5rem">
                CALL US
              </Text>
              <Text fontSize="0.8rem">+49 89 127695-101</Text>
              <Text fontSize="0.8rem">Argentina: 0800-666-0663</Text>
              <Text fontSize="0.8rem">Chile: 800-914-515</Text>
              <Text fontSize="0.8rem">Colombia: 01800-518-5268</Text>
              <Text fontSize="0.8rem">Mexico: 01-800-099-0703</Text>
              <Text fontSize="0.8rem">Peru: 0800-78259</Text>
              <Text fontSize="0.8rem">Puerto Rico: 1-787-303-4205</Text>
              <Text fontSize="0.8rem">Available 24/7</Text>
            </Box>
            <Box
              w={{ base: "80%", md: "45%", lg: "45%" }}
              border="thin lightgray solid"
              p="0.5rem"
              margin="auto"
              mt="0.5rem"
            >
              <Text fontSize="0.8rem" fontWeight={500} my="0.5rem">
                MAIL US
              </Text>
              <Text fontSize="0.8rem" my="0.8rem">
                customercare@Woodland.com
              </Text>
              <Text fontSize="0.8rem">
                Please note that due to a high amount of requests, we might take
                a few days to get back to you. We apologize for any
                inconvenience this may cause.
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>

      {/* <Button onClick={toggleColorMode}>toggle</Button> */}
    </>
  );
}

export default CartPage