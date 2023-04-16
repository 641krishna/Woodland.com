import React, { useEffect } from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../Redux/cart/action";
import { useDispatch } from "react-redux";

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(emptyCart());
    }, []);

    return (
        <Flex
            textAlign="center"
            px={6}
            w={["98%", "95%", "85%", "60%"]}
            align={"center"}
            margin="auto"
            minH={"100vh"}
            mb={{ base: "10rem", md: "15rem", lg: "15rem" }}
            justifyContent="center"
        >
            <Box fontFamily="poppins">
                <Image
                    src="https://i.postimg.cc/wjHY3JY6/Pngtree-fast-delivery-man-5367922.png"
                    margin="auto"
                />
                <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
                <Heading as="h2" size="xl" my="2rem" color={"green.500"}>
                    Order Confirmed
                </Heading>
                <Text color={"gray.700"}>
                    Your order is currently being processed. You will receive an order
                    confirmation email shortly with the expected delivery date for your
                    item.
                </Text>
                <Text color={"gray.500"} my="2rem" fontSize="1.2rem">
                    Thanks for shopping with us online!
                </Text>
                <Button
                    variant="ghost"
                    colorScheme="twitter"
                    borderRadius={0}
                    size="sm"
                    onClick={() => navigate("/")}
                    fontSize="0.8rem"
                    p="1.5rem"
                >
                    CONTINUE SHOPPING
                </Button>
            </Box>
        </Flex>
    );
};

export default CheckoutSuccess;