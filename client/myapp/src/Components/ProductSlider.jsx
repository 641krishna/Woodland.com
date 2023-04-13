import React, { useEffect } from "react";
import Slider from "react-slick";
import "./ProductSlider.css";
import "./ProductSliderTheme.css";
import { RiShoppingCart2Line } from "react-icons/ri";
import {
    Card,
    CardBody,
    CardFooter,
    Container,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    ButtonGroup,
    Button,
    Flex,
    Box,
    SimpleGrid,
    HStack,
    useToast,
} from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { addProductCart } from "../Redux/cart/action";

const ProductSlider = ({ title, query, data }) => {
    console.log(data)
    const { isLoading, isError, authData } = useSelector((store) => {
        // console.log(store.carts.message);
        return {
            isLoading: store.products.allProducts.isLoading,
            isError: store.products.allProducts.isError,

            authData: store.auth.data,
        };
    }, shallowEqual);
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

        // console.log(isLoading, isError, authData);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        // ssr:false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false,
                },
            },
        ],
    };
    // console.log(data);
    return (
        <Box
            //   border="1px red solid"
            w={["100%", "95%", "85%", "60%"]}
            margin="auto"
            // bg="gray"
            my="3rem"
        >
            <Box
                sx={{
                    ".slick-dots": {
                        transform: "translateY(1em)",
                    },
                    ".slick-dots li button": {
                        _before: {
                            transition: "0.2s",
                            content: "''",
                            borderRadius: "100%",
                            background: "gray.500",
                            w: "0.5rem",
                            h: "0.5rem",
                        },
                    },
                    ".slick-arrow": {
                        // backgroundColor: "cyan.500",
                        color: "gray",
                        w: "30px",
                        h: "30px",
                        borderRadius: "100%",
                        transition: "0.2s",
                        _hover: {
                            backgroundColor: "gray.200",
                            color: "gray",
                        },
                        _focus: {
                            backgroundColor: "gray.200",
                            color: "gray",
                        },
                        _before: {
                            transition: "0.2s",
                        },
                    },
                    ".slick-prev": {
                        left: "-40px",
                        _before: {
                            content: '"◀"',
                        },
                    },
                    ".slick-next": {
                        right: "-40px",
                        _before: {
                            content: '"▶"',
                        },
                    },
                }}
                // border="1px blue solid"
                display="flex"
                flexDirection="column"
            >
                <Text
                    fontFamily="Montserrat"
                    fontSize="1.6rem"
                    color="gray.700"
                    m="0.8rem"
                >
                    {title}
                </Text>
                {data && (
                    <Slider {...settings}>
                        {data.map((el) => (
                            <SimpleGrid
                                spacing={4}
                                //   templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                                key={el._id}
                            >
                                <Card
                                    // maxW='sm'
                                    // height="30rem"
                                    // h={{ base: "25rem", md: "25rem", lg: "30rem" }}
                                    w={{ base: "15rem", md: "13rem", lg: "16rem" }}
                                    // w="5rem"
                                    // border="1px red solid"
                                    margin="auto"
                                    align="center"
                                    fontFamily="poppins"
                                    textAlign="left"
                                >
                                    <Link to={`/product/${el._id}`}>
                                        <CardBody>
                                            <Image

                                                src={el.images.split('|')[0]}
                                                borderRadius="sm"
                                                w={{ base: "70%", md: "70%", lg: "70%" }}
                                                margin="auto"
                                            />
                                            <Stack mt="6" spacing="3">
                                                <Text
                                                    size="md"
                                                    className="ProductSliderTitle"
                                                    fontWeight="500"
                                                >
                                                    {el.title}
                                                </Text>
                                                <Text fontSize="0.8rem">{el.brand}</Text>
                                                <Text
                                                    fontSize="0.8rem"
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
                                        justifyContent="flex-end"
                                        //   border="1px blue solid"
                                        fontFamily="poppins"
                                    >
                                        <ButtonGroup
                                            spacing="8"
                                            // border="1px blue solid"
                                            alignItems="center"
                                        >
                                            <Button
                                                variant="ghost"
                                                colorScheme="gray"
                                                size="sm"
                                                fontSize="0.7rem"
                                            >
                                                Details
                                            </Button>
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
                                                <Text
                                                    fontSize="0.6rem"
                                                    color={el.is_stock == "In Stock" ? "green" : "red"}
                                                    mr="0.5rem"
                                                >
                                                    {el.is_stock}
                                                </Text>
                                            )}
                                        </ButtonGroup>
                                    </CardFooter>
                                </Card>
                            </SimpleGrid>
                        ))}
                    </Slider>
                )}
            </Box>
        </Box>
    );
};

export default ProductSlider;