import {
    Box,
    Flex,
    Text,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Image,
    SimpleGrid,
    Stack,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { TbShoppingCartOff } from "react-icons/tb";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProductCart } from "../Redux/cart/action";
import { getAllProducts } from "../Redux/product/action";

const ProductContainer = ({ brand, category }) => {
    // console.log(brand, category);

    const { data, authData } = useSelector((store) => {
        return {
            isLoading: store.products.allProducts.isLoading,
            isError: store.products.allProducts.isError,
            data: store.products.data,
            authData: store.auth.data,
        };
        // console.log(store.product.allProducts);
    }, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        const queryParams = {
            params: {
                category: category,
                brand: brand,
                limit: 10,
            },
        };
        dispatch(getAllProducts(queryParams));
    }, []);

    const toast = useToast();
    const navigate = useNavigate();

    // ADD PRODUCT TO CART FUNCTION
    const addProdCart = (id) => {
        if (authData.isAuthenticated == true) {
            dispatch(addProductCart(id)).then((res) => {
                // console.log(res.payload.message);
                toast({
                    title: res.payload.message,
                    status:
                        res.payload.message == "Product already exists in cart"
                            ? "error"
                            : res.payload.message == "Product Added Successfully in cart"
                                ? "success"
                                : "",
                    isClosable: true,
                    duration: 800,
                    containerStyle: {
                        borderRadius: "0px",
                        fontFamily: "poppins",
                        fontSize: "0.8rem",
                        fontWeight: "100",
                        width: "auto",
                        minWidth: "0%",
                    },
                });
            });
        } else {
            toast({
                title: "Login before adding product to cart  ",
                status: "info",
                isClosable: true,
                duration: 800,
                containerStyle: {
                    borderRadius: "0px",
                    fontFamily: "poppins",
                    fontSize: "0.8rem",
                    fontWeight: "100",
                    width: "auto",
                    minWidth: "0%",
                },
            });
            navigate("/login");
        }

        // console.log(cartMessage);
    };

    // console.log(isLoading, isError, data);
    return (
        <>
            <Flex
                w={["96%", "95%", "85%", "60%"]}
                margin="auto"
                mt="4rem"
                // border="1px red solid"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                fontFamily="montserrat"
            >
                <Box
                // border="1px red solid"
                >
                    <Text fontWeight={500}>YOU MIGHT ALSO LIKE</Text>
                </Box>
                <Box my="2rem">
                    <SimpleGrid
                        spacing={4}
                        templateColumns={{
                            base: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)",
                        }}

                    >
                        {data.map((el) => (
                            <Card

                                w={{ base: "100%", md: "13rem", lg: "16rem" }}
                                key={el._id}
                                // border="1px red solid"
                                border="1px lightgray solid"
                                borderRadius="none"
                                boxShadow="none"
                                margin="auto"
                                align="center"
                                fontFamily="poppins"
                                textAlign="left"
                            >
                                <Link to={`/products/${el._id}`}>
                                    <CardBody>
                                        <Image
                                            src={el.images.split('|')[0]}
                                            // height='10rem'
                                            borderRadius="sm"
                                            w={{ base: "60%", md: "70%", lg: "70%" }}
                                            margin="auto"
                                        />
                                        <Stack mt={{ base: "3", md: "5", lg: "5" }} spacing="3">
                                            <Text
                                                // size="md"
                                                className="ProductSliderTitle"
                                                fontWeight="500"
                                                fontSize={{
                                                    base: "0.7rem",
                                                    md: "0.8rem",
                                                    lg: "0.8rem",
                                                }}
                                            >
                                                {el.title}
                                            </Text>
                                            <Text
                                                fontSize={{
                                                    base: "0.6rem",
                                                    md: "0.7rem",
                                                    lg: "0.8rem",
                                                }}
                                            >
                                                {el.brand}
                                            </Text>
                                            <Text
                                                fontSize={{
                                                    base: "0.6rem",
                                                    md: "0.7rem",
                                                    lg: "0.8rem",
                                                }}
                                                color={el.is_stock == "In Stock" ? "green" : "red"}
                                            >
                                                {el.is_stock}
                                            </Text>
                                            <Text color="blue.600" fontSize="1rem">
                                                {`\u20B9 ${el.price}`}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                </Link>
                                <Divider />
                                <CardFooter
                                    display="flex"
                                    justifyContent="space-between"

                                    fontFamily="poppins"
                                    w={{ base: "10rem", md: "13rem", lg: "16rem" }}
                                >
                                    <ButtonGroup

                                        alignItems="center"
                                        display={{ base: "none", md: "flex", lg: "flex" }}
                                        justifyContent="space-between"
                                        w="100%"
                                    >
                                        <Link to={`/products/${el._id}`}>
                                            <Button
                                                variant="ghost"
                                                colorScheme="gray"
                                                size="sm"
                                                fontSize="0.7rem"
                                            >
                                                Details
                                            </Button>
                                        </Link>
                                        {el.is_stock == "In Stock" ? (
                                            <Button
                                                variant="outline"
                                                colorScheme="orange"
                                                size="sm"
                                                fontSize="0.7rem"
                                                leftIcon={<RiShoppingCart2Line />}
                                                onClick={() => addProdCart(el._id)}
                                            >
                                                Add to cart
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                colorScheme="red"
                                                disabled={true}
                                                // border="1px red solid"
                                                leftIcon={<TbShoppingCartOff />}
                                                fontSize="0.7rem"
                                            >
                                                Out of stock
                                            </Button>
                                        )}
                                    </ButtonGroup>
                                    {/* small screens */}
                                    <ButtonGroup
                                        
                                        w="100%"
                                        alignItems="center"
                                        display={{ base: "flex", md: "none", lg: "none" }}
                                        flexDirection="column"
                                        justifyContent="center"
                                        gap="0.5rem"
                                    >
                                        <Link to={`/products/${el._id}`}>
                                            <Button
                                                variant="ghost"
                                                colorScheme="gray"
                                                w="100%"
                                                fontSize="0.7rem"
                                                size="sm"
                                            >
                                                Details
                                            </Button>
                                        </Link>
                                        {el.is_stock == "In Stock" ? (
                                            <Button
                                                variant="outline"
                                                colorScheme="orange"
                                                w="100%"
                                                size="sm"
                                                fontSize="0.7rem"
                                                mr="0.5rem"
                                                leftIcon={<RiShoppingCart2Line />}
                                            >
                                                Add to cart
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                w="100%"
                                                size="sm"
                                                colorScheme="red"
                                                disabled={true}
                                              
                                                mr="0.5rem"
                                            >
                                                {<TbShoppingCartOff />}
                                            </Button>
                                        )}
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Box>
            </Flex>
        </>
    );
};

export default ProductContainer;