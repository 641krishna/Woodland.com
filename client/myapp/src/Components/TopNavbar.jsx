import { Box, Text, useColorModeValue, Flex, Image } from '@chakra-ui/react';
import React, { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from './TopNavbar.module.css';

const TopNavbar = () => {
    const location = useLocation().pathname;
    const [selection, setSelection] = useState("");
    const { isLoading, isError, message, data } = useSelector((store) => {
        return {
            isLoading: store.auth.userLogin.isLoading,
            isError: store.auth.userLogin.isError,
            message: store.auth.userLogin.message,
            data: store.auth.data,
        };
    }, shallowEqual);
    // console.log(isLoading, isError, message, data)

    const leftmenu = [
        {
            title: 'MEN',
            href: '/product?category=Men',
        },
        {
            title: 'WOMEN',
            href: '/product?category=Women',
        },
        {
            title: 'BAGS ',
            href: '/product?category=Bags',
        },
    ];

    const RightMenu = [
        {
            title: "Signup for Newsletter",
            href: "#",
        },
        {
            title:
                data.user && data.isAuthenticated == true
                    ? `Hi, ${data.user.name}`
                    : "My account",
            href: data.user && data.isAuthenticated == true ? `/account` : "/login",
        },
        {
            title: "About me",
            href: "/aboutme",
        },
        {
            title: "Lebanon | English",
            href: "#",
        },
    ];

    const ClickSelection = (value) => {
        setSelection(value);
    };
    console.log(selection);
    return (
        <>
            <Box
                display={{ lg: 'flex', md: 'flex', base: 'none' }}
                // border='1px solid green'
                margin='auto'
                w={['98%', '85%', '100%']}
                height='3.0rem'
                bg={useColorModeValue("gray.50", "gray.900")}
                color={useColorModeValue("gray.700", "gray.200")}
            >
                <Box
                    // border='1px solid pink'
                    display='flex'
                    justifyContent='space-between'
                    marginRight="0.5rem"
                    w={{ base: '50%', md: '35%', lg: '40%' }}
                >
                    {leftmenu.map((el) => (
                        <Box
                            key={el.title}
                            margin='0 0.5rem'
                            alignItems='center'
                            cursor='pointer'
                            onClick={(e) => ClickSelection(e.target.innerText)}
                            w={["98%", "95%", "70%"]}
                            textAlign='center'
                            justifyContent="center"
                            display={location == "/" ? "flex" : "none"}
                        >
                            <Link>
                                <Text
                                    padding='0.5rem'
                                    fontSize={["0.4rem", "0.6rem", "0.9rem"]}
                                    fontWeight={['400', '500', '600']}
                                    textAlign='center'
                                >{el.title}
                                </Text>
                            </Link>
                        </Box>
                    ))}
                </Box>

                {/* --------------->RIGHT SIDE */}
                <Box
                    //   border="1px green solid"
                    display="flex"
                    justifyContent="space-between"
                    marginLeft='3rem'
                    w={{ base: "50%", md: "45%", lg: "45%" }}
                >
                    {RightMenu.map((el) => (
                        <Box
                            key={el.title}
                            display="flex"
                            margin="0 0.1rem"
                            alignItems="center"
                            bg={selection == el ? "#F2F2F2" : ""}


                            cursor="pointer"
                            fontFamily="poppins"
                            w={["98%", "95%", "95%", "70%"]}
                            textAlign="center"
                            justifyContent="center"
                        >
                            <Link to={el.href} textDecoration="none">
                                <Text
                                    padding="0.5rem"
                                    fontSize="0.8rem"
                                    _hover={{ textColor: "gray.900" }}
                                    textAlign="center"
                                    textColor="#757575"
                                    fontWeight="bold"
                                >
                                    {el.title}
                                </Text>
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Flex
       
        flex={{ base: 1 }}
        justifyContent="center"
        margin="auto"
        my="1.5rem"
        display={{ base: "none", md: "flex", lg: "flex" }}
      >
        <MidScreenLogo />
      </Flex>
        </>
    );
};

export default TopNavbar;
const MidScreenLogo = () => {
    let head = "Sale – up to 60% off";
  
    return (
      <>
        <Flex direction="column">
          <Link to="/">
            <Image mt='-2rem' style={{width:'16rem', height:'8rem'}}
             src="https://www.woodlandworldwide.com/images/h-logo.png" />
          </Link>
          <Text
            className={styles.headline}
            fontFamily="Poppins"
            // mt="1rem"
            color="red"
            fontSize="0.9rem"
          >
            {head}
          </Text>
        </Flex>
      </>
    );
  };