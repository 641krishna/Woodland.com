import React from 'react';
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  CardFooter,
  Divider,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  Skeleton,
  Heading,
  Flex,
} from "@chakra-ui/react";
import FilterSection, {
  MobileFilterSection,
  SortBy,
} from "../Components/FilterSection";
import Pagination from "../Components/Pagination";
import { useEffect, useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { TbShoppingCartOff } from "react-icons/tb";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addProductCart } from "../Redux/cart/action";
import { getAllProducts } from "../Redux/product/action";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const search = useLocation().search;
  const toast = useToast();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data,
    cartMessage,
    cartIsError,
    cartIsLoading,
    authData,
  } = useSelector((store) => {
    // console.log(store.carts.message);
    return {
      isLoading: store.products.allProducts.isLoading,
      isError: store.products.allProducts.isError,
      data: store.products.data,
      cartMessage: store.carts.message.message,
      cartIsLoading: store.carts.isLoading,
      cartIsError: store.carts.isError,
      authData: store.auth.data,
    };
  }, shallowEqual);

  // console.log(data[0].images.split("|")[0]);


  const dispatch = useDispatch();

  const handlePage = (newpage) => {
    setPage(newpage);
  };
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

  useEffect(() => {
    if (!search) {
      dispatch(getAllProducts());
    } else {
      const queryParams = {
        params: {
          ideal_for: searchParams.get("ideal_for"),
          brand: searchParams.get("brand"),
          color: searchParams.get("color"),
          sort: searchParams.get("sort"),
          orderBy: searchParams.get("orderBy"),
          page: page,
          limit: 10,
        },
      };
      dispatch(getAllProducts(queryParams));
    }
  }, [search]);
  return (
    <>
      <Box
        w={["98%", "95%", "85%", "60%"]}
        margin="auto"
        fontSize="0.8rem"
        textDecoration="none"
        fontFamily="poppins"
        my="2rem"
      >
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
          textDecoration="none"
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/products/${searchParams.get("ideal_for")}`}>
              {searchParams.get("category")}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box
        w={["98%", "95%", "85%", "60%"]}
        display="flex"
        // border="1px blue solid"
        margin="auto"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row", lg: "row" }}
      >
        <Box
          // border="1px red solid"
          w={["0", "0", "30%", "20%"]}
          display={{ base: "flex", md: "flex", lg: "flex" }}
        >
          <FilterSection currentPage={page} />
        </Box>
        <Box
          w={["100%", "95%", "70%", "80%"]}
        // border="1px red solid"
        >
          {isLoading == true ? (
            <Stack>
              <Skeleton h="3rem" w="full" />
              <Skeleton h="3rem" w="full" />
              <Skeleton h="3rem" w="full" />
              <Skeleton h="3rem" w="full" />
              <Skeleton h="3rem" w="full" />
              <Skeleton h="3rem" w="full" />
              <Skeleton h="3rem" w="full" />
              <Skeleton h="3rem" w="full" />
              <Skeleton h="3rem" w="full" />
              <Skeleton h="3rem" w="full" />
            </Stack>
          ) : data.length == 0 ? (
            <Flex h="100vh" align={"center"}>
              <Box>
                <Image
                  src="https://eonbazar.com/images/npf.jpg"
                  margin="auto"
                />

              </Box>
            </Flex>
          ) : (
            <Box>
              <SimpleGrid
                spacing={4}
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}

              >
               
                {data.map((el) => (
                  <Card
                    w={{ base: "100%", md: "13rem", lg: "16rem" }}
                    key={el._id}
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
                          src={el.images}
                          borderRadius="sm"
                          w={{ base: "60%", md: "70%", lg: "70%" }}
                          margin="auto"
                        />
                        <Stack mt={{ base: "3", md: "5", lg: "5" }} spacing="3">
                          <Text
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
                            color={
                              el.is_stock == "In Stock" ? "green" : "red"
                            }
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
                      // border="1px blue solid"
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
                        // spacing="8"
                        // border="1px blue solid"
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
                            onClick={() => addProdCart(el._id)}
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
                            // border="1px red solid"
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
          )}
        </Box>
      </Box>
      <Box>
        <Pagination
          current={page}
          onChange={handlePage}
          AvailableData={data.length}
        />
      </Box>
    </>
  )
}

export default ProductsPage;