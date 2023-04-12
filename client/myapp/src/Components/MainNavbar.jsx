import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    PopoverArrow,
    PopoverHeader,
    PopoverBody,
    Image,
} from "@chakra-ui/react";
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from "@chakra-ui/icons";
import { NavbarDetails } from "./MainNavbarDetails";
import { RiShoppingCart2Fill } from "react-icons/ri";

import React, { useEffect } from 'react'
import { authLogout, isAuthCheck, logoutSuccess } from "../Redux/auth/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart } from "../Redux/cart/action";

export default function MainNavbar() {
    const dispatch = useDispatch();
    const { data, cartData } = useSelector((store) => {
        return {
            isLoading: store.auth.userLogin.isLoading,
            isError: store.auth.userLogin.isError,
            message: store.auth.userLogin.message,
            data: store.auth.data,
            cartData: store.carts.carts,
        };
    }, shallowEqual);

    const handleLogout = () => {
        dispatch(authLogout());
    };

    useEffect(() => {
        dispatch(isAuthCheck());
        dispatch(getCart());
    }, []);

    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                position: '-webkit-sticky',
                position: 'sticky',
                top: '0'
            }}
            borderBottom='1.5px solid #DFDFDF'
            borderStyle='solid'
            zIndex='999'
        >
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={'60px'}
                py={{ bae: 2 }}
                px={{ base: 4 }}
                borderStyle={'solid'}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
                w={["100%", "100%", "85%", "60%"]}
                margin="auto"
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: "flex", md: "none" }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                >
                    <Link
                        textAlign={useBreakpointValue({ base: "center", md: "left" })}
                        fontFamily={"heading"}
                        color={useColorModeValue("gray.800", "white")}
                        display={{ md: "none", lg: "none" }}
                        href="/"
                    >
                        <Image w='10rem' h='7rem' src="https://www.woodlandworldwide.com/images/h-logo.png" />
                    </Link>
                    <Flex
                        display={{ base: "none", md: "flex" }}
                    >
                        <DesktopNav />
                    </Flex>
                </Flex>
                {data.isAuthenticated == true ? (
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={6}
                    >
                        <Button
                            as={"a"}
                            fontSize={"sm"}
                            fontWeight={500}
                            variant={"link"}
                            onClick={() => navigate("/login")}
                            cursor="pointer"
                            _hover={{
                                textDecoration: "none",
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontSize={"0.8rem"}
                            fontWeight={600}
                            color={"white"}
                            bg={"blue.600"}
                            _hover={{
                                bg: "gray.400",
                            }}
                            onClick={() => navigate("/signup")}
                            size="0"
                            p="0.3rem"
                            borderRadius="0"
                        >
                            Sign Up
                        </Button>
                    </Stack>
                ) : (
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={6}
                    >
                        <Button
                            as={"a"}
                            fontSize="sm"
                            fontWeight={400}
                            rightIcon={<RiShoppingCart2Fill fontSize="1rem" />}
                            variant={"link"}
                            href="/cart"
                            color="#231F20"
                            bg="white"
                            cursor="pointer"
                            _hover={{
                                textDecoration: "none",
                            }}
                        >
                            Cart
                            {cartData < 1 ? null : (
                                <Text
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    position="absolute"
                                    top="-0.3rem"
                                    right="-0.3rem"
                                    fontWeight={500}
                                    fontFamily="poppins"
                                    fontSize="0.6rem"
                                    bg="red"
                                    color="#fff"
                                    borderRadius="50%"
                                    px="0.2rem"
                                    py="0"
                                    w="1rem"
                                    h="1rem"
                                >
                                    {cartData.length}
                                </Text>
                            )}
                        </Button>
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontSize={"0.8rem"}
                            fontWeight={600}
                            color={"white"}
                            bg={"gray.600"}
                            _hover={{
                                bg: "gray.400",
                            }}
                            onClick={() => handleLogout()}
                            size="0"
                            p="0.3rem"
                            borderRadius="0"
                        >
                            Logout
                        </Button>
                    </Stack>
                )}
            </Flex>
            <Box w={["95%", "95%", "85%", "60%"]} margin="auto" h="2rem" my="0.5rem">
              
            </Box>
            <Collapse in={isOpen} animateOpacity>
                <MainCategory />
                <MobileNav data={data} dispatch={dispatch} />
            </Collapse>
        </Box>
    )
};



const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");

    return (
        <Stack direction={"row"} spacing={4} alignItems="center">
            <Link
                fontSize={["0.4rem", "0.6rem", "0.9rem"]}
                _hover={{
                    textDecoration: "none",
                    color: "red",
                }}
                href="/"
                fontWeight="600"
            >
                HOME
            </Link>
            {/* {console.log(NavbarDetails.label)} */}
            {NavbarDetails.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? "#"}
                                color={linkColor}
                                _hover={{
                                    textDecoration: "none",
                                    color: linkHoverColor,
                                }}
                                fontSize={["0.4rem", "0.6rem", "0.8rem"]}
                                fontWeight={['400', '500','600']}
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                borderRadius="0px"
                                bg={popoverContentBgColor}

                                w="full"
                            >
                                <PopoverArrow bg="#F2F2F2" />
                                <Flex
                                    direction="row"
                                    gap="0"

                                >
                                    {navItem.children.map((child) => (

                                        <Stack
                                            key={child.subLabel}
                                        >
                                            <PopoverHeader
                                                align="left"
                                                pl="1.5rem"
                                                bg="#F2F2F2"
                                                fontSize="0.8rem"
                                                fontFamily="poppins"
                                                fontWeight={500}
                                                pt="0.6rem"
                                            >
                                                {child.subLabel}
                                            </PopoverHeader>
                                            <PopoverBody p={4}>
                                                <Stack>
                                                    {child.subChildren.map((child) => (
                                                        <DesktopSubNav key={child.label} {...child} />
                                                    ))}
                                                </Stack>
                                            </PopoverBody>
                                        </Stack>
                                    ))}

                                </Flex>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    // console.log(label, href);
    return (
        <Link
            href={href}
            role={"group"}
            display={"block"}
            p={1}
            rounded={"md"}
            _hover={{ bg: useColorModeValue("#F2F2F2", "gray.900") }}
        // border="1px red solid"
        >
            <Stack direction={"row"} align={"center"}>
                <Box>
                    <Text
                        transition={"all .3s ease"}
                        _groupHover={{ color: "gray.900" }}
                        // fontWeight={400}
                        fontSize="0.75rem"
                        fontFamily="poppins"
                        letterSpacing="0.03rem"
                    >
                        {label}
                    </Text>
                </Box>
                <Flex
                    transition={"all .3s ease"}
                    transform={"translateX(-10px)"}
                    opacity={0}
                    _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
                    justify={"flex-end"}
                    align={"center"}
                    flex={1}
                >
                    <Icon color={"gray.900"} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = ({ data, dispatch }) => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ base: "flex", md: "none", lg: "none" }}
        
        >
            {NavbarDetails.map((navItem) => (

                <MobileNavItem
                    key={navItem.label}
                    label={navItem.label}
                    children={navItem.children}
                />
            ))}

            {data.isAuthenticated == false ? (
                <Box
                    // border="1px red solid"
                    fontWeight={600}
                    color="gray.600"
                    display="flex"
                    justifyContent="space-around"
                    mt="2rem"
                >
                    <Link
                        p="0.2rem"
                        _hover={{
                            textDecoration: "none",
                        }}
                        href="/signup"
                    >
                        Sign Up
                    </Link>
                    <Link
                        p="0.2rem"
                        _hover={{
                            textDecoration: "none",
                        }}
                        href="/login"
                    >
                        Sign In
                    </Link>
                </Box>
            ) : (
                <Box
                    // border="1px red solid"

                    fontWeight={600}
                    color="gray.600"
                    display="flex"
                    justifyContent="space-around"
                    mt="2rem"
                >
                    <Link
                        p="0.5rem"
                        _hover={{
                            textDecoration: "none",
                        }}
                        onClick={() => dispatch(logoutSuccess())}
                        bg={"gray.600"}
                        color="white"
                    >
                        Logout
                    </Link>
                </Box>
            )}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
    //   console.log(label, children);
    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                justify={"space-between"}
                align={"center"}
                _hover={{
                    textDecoration: "none",
                }}
            // border="1px green solid"
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.600", "gray.200")}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={"all .25s ease-in-out"}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                    // border="1px red solid"
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
                <Stack
                    mt={2}
                    //   borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align={"start"}
                    // border="1px red solid"
                    overflow="scroll"
                    h="18rem"
                    display="grid"
                    gap="1rem"
                    gridTemplateColumns="repeat(2,1fr)"
                >
                    {children &&
                        children.map((child) => (
                            // <Link key={child.label} py={2} href={child.href}>
                            //   {child.label}
                            // </Link>

                            <MobileNavItemInner
                                key={child.subLabel}
                                label={child.subLabel}
                                children={child.subChildren}
                                id={child.id}
                            />
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const MobileNavItemInner = ({ label, children, href, id }) => {
    const { isOpen, onToggle } = useDisclosure();
    //   console.log(label, children);
    //   console.log(label % 2 == 0);
    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                mt={id % 2 == 0 ? -2 : 0}
                py={2}
                pl={4}
                as={Link}
                href={href ?? "#"}
                justify={"space-between"}
                align={"left"}
                _hover={{
                    textDecoration: "none",
                }}
            // border="1px blue solid"
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.600", "gray.200")}
                    align={"left"}
                    fontFamily="poppins"
                    fontSize="0.95rem"
                >
                    {label}
                </Text>
            </Flex>
            ;
            <Stack
                mt={2}
                pl={4}
                // borderLeft={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.700")}
                align={"start"}
            // border="1px red solid"
            >
                {children &&
                    children.map((child) => (
                        <Link
                            key={child.label}
                            py={2}
                            href={child.href}
                            align={"left"}
                            fontFamily="poppins"
                            fontSize="0.9rem"
                        >
                            {child.label}
                        </Link>
                    ))}
            </Stack>
        </Stack>
    );
};

const MainCategory = () => {
    const Leftmenu = [
        {
            title: "WOMEN",
            href: "/product?category=Women",
        },
        {
            title: "MEN",
            href: "/product?category=Men",
        },
        {
            title: "BAGS",
            href: "/product?category=Bags",
        },
    ];
    return (
        <Box
            // border="1px pink solid"
            display={{ base: "flex", md: "none", lg: "none" }}
            justifyContent="space-between"
            marginRight="0.5rem"
            margin="auto"
            w="80%"
        >
            {Leftmenu.map((el) => (
                <Box
                    key={el.title}
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    textAlign="center"
                    justifyContent="center"
                >
                    <Link
                        padding="1rem"
                        fontSize="0.8rem"
                        textAlign="center"
                        _hover={{
                            textDecoration: "none",
                            color: "gray.900",
                        }}
                        href={el.href}
                    >
                        {el.title}
                    </Link>
                </Box>
            ))}
        </Box>
    );
};