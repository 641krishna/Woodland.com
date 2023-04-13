import React, { useEffect, useState } from 'react';
import {
    Flex,
    Image,
    Box,
    Text,
    Button,
    Collapse,
    Divider,
    Grid,
    ListItem,
    ListIcon,
    List,
    GridItem,

} from "@chakra-ui/react";
import { getSliderProducts } from '../Redux/product/action';
import ProductSlider from '../Components/ProductSlider';

const Home = () => {
    const [menData, setMenData] = useState([]);
    const [womenData, setWomenData] = useState([]);
    const [bagData, setBagData] = useState([]);

    const fetch = async (obj) => {
        try {
            let res = await getSliderProducts(obj);
            return res.data.Products;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch({ category: 'Women', limit: 10 })
            .then((r) => {
                setWomenData(r);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    useEffect(() => {
        fetch({ category: 'Men', limit: 10 })
            .then((r) => {
                setMenData(r);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    useEffect(() => {
        fetch({ category: 'Bags', limit: 10 })
            .then((r) => {
                setBagData(r);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);


    return (
        <>
            <Box>
                <Box overflow="hidden" position="relative">
                    <ImageBanner
                        src={
                            "https://woodland-dev-storage134048-dev.s3.ap-south-1.amazonaws.com/Images/hero_banner_2.png"
                        }
                    />
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        position="absolute"
                        top={{ base: "50%", md: "50%", lg: "50%" }}
                        right={{ base: "30%", md: "30%", lg: "30%" }}
                        mt="0"
                        mb="0"
                        cursor="pointer"
                        gap="0.5rem"
                    >
                        <Text
                            fontFamily="Montserrat"
                            color="white"
                            fontSize={{ base: "0.8rem", md: "2rem", lg: "2rem" }}
                        >
                            Comfort is the New Style!
                        </Text>
                        <Button
                            bg="white"
                            color="gray.900"
                            variant="solid"
                            size="sm"
                            borderRadius="0"
                            fontSize="0.7rem"
                            w="3.9rem"
                            h="1.1rem"
                            mt="0.5rem"
                            _hover={{ bg: "black", color: "white" }}
                            as="a"
                            href="/products"
                        >
                            SHOP NOW
                        </Button>
                    </Box>
                </Box>

                {/* ------SLIDER------- */}
                {womenData && (
                    <ProductSlider data={womenData} title={'New Arrivals'} />
                )}
            </Box>
            <Box overflow="hidden" position="relative">
                <ImageBanner
                    src={
                        "https://woodland-dev-storage134048-dev.s3.ap-south-1.amazonaws.com/Images/wdl_shoe_banner.png"
                    }
                />
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    position="absolute"
                    // border="1px red solid"
                    top={{ base: "75%", md: "75%", lg: "75%" }}
                    right={{ base: "50%", md: "50%", lg: "50%" }}
                    mt="0"
                    mb="0"
                    cursor="pointer"
                    gap="0.5rem"
                >
                    <Button
                        bg="white"
                        color="gray.900"
                        variant="solid"
                        size="sm"
                        borderRadius="0"
                        fontSize="0.5rem"
                        w="3.2rem"
                        h="1.1rem"
                        mt="0.5rem"
                        _hover={{ bg: "gray.900", color: "white" }}
                        as="a"
                        href="/products"
                    >
                        SHOP NOW
                    </Button>
                </Box>
            </Box>
            <Box>
                {menData && <ProductSlider data={menData} title={'New Arrivals'} />}
            </Box>
            <Box
                overflow="hidden"
                position="relative"
                w={["100%", "95%", "85%", "70%"]}
                margin="auto"
                // border="1px blue solid"
                mt="6rem"
            >
                <Box
                    display="flex"
                    // border="1px red solid"
                    alignItems="center"
                    background="linear-gradient(90deg, rgba(233,233,231,1) 50%, rgba(0,0,0,1) 50%)"
                >
                    <Box w="50%">
                        <ImageBanner
                            src={
                                "https://img.mytheresa.com/media/static/raw/cms/l/MW_HP_2022_CW51/BIG3_EN/BIG2_DESKTOP_2X_20221216185528.jpg?imwidth=1180&imdensity=1"
                            }
                        />
                    </Box>
                    <Flex w="50%" bg="black"></Flex>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    position="absolute"
                    // border="1px red solid"
                    top={{ base: "40%", md: "40%", lg: "40%" }}
                    left={{ base: "60%", md: "65%", lg: "63%" }}
                    mt="0"
                    mb="0"
                    cursor="pointer"
                    gap="0.5rem"
                    color="white"
                >
                    <Text
                        fontFamily="Montserrat"
                        fontSize={{ base: "0.8rem", md: "2rem", lg: "3rem" }}
                    >
                        SALE
                    </Text>
                    <Text
                        fontFamily="Montserrat"
                        fontSize={{ base: "0.4rem", md: "0.6rem", lg: "0.8rem" }}
                        textAlign="right"
                        fontWeight="500"
                    >
                        Further reductions – up to 60% off
                    </Text>
                    <Button
                        bg="white"
                        color="gray.800"
                        variant="solid"
                        size="sm"
                        borderRadius="0"
                        fontSize="0.5rem"
                        w="3.2rem"
                        h="1.1rem"
                        mt="0.5rem"
                        _hover={{ bg: "gray.900", color: "white" }}
                        as="a"
                        href="/products"
                    >
                        SHOP NOW
                    </Button>
                </Box>
            </Box>
            <Box>
                {bagData && (
                    <ProductSlider data={bagData} title={"Other Accessories"} />
                )}
            </Box>
        </>
    );
};

const ImageBanner = ({ src }) => {
    return (
        <Flex
            display={{ base: "flex", md: "flex", lg: "flex" }}
            margin="auto"
            justifyContent="space-between"
            w={["100%", "95%", "85%", "70%"]}
            my="2rem"
        >
            <Image src={src} margin="auto" />
        </Flex>
    );
};


export default Home;