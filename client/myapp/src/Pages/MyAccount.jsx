import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Image,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

const MyAccount = () => {
  const { message, data } = useSelector((store) => {
    // console.log(store.auth.userLogin)
    return {
      message: store.auth.userLogin.message,
      data: store.auth.data,
    };
  }, shallowEqual);
  return (
    data.user != null && (
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

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={`/myaccount`}>My Account</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        <Stack
          w={["98%", "95%", "85%", "60%"]}
          // border="1px red solid"
          margin="auto"
          my="4rem"
          display="flex"
          justifyContent="center"
          flexDirection={{ base: "column", md: "row", lg: "row" }}
          alignItems="center"
          gap="2rem"
          fontFamily="Montserrat"
        >
          <Box
            w={{ base: "30%", md: "30%", lg: "30%" }}
            // border="1px blue solid"
            borderRadius="50%"
            margin="auto"
          >
            <Image
              src={`https://eu.ui-avatars.com/api/?name=${data.user.name}&size=250`}
              //   w="100%"
              borderRadius="50%"
              margin="auto"
            />
          </Box>
          <Box
            w={{ base: "98%", md: "70%", lg: "70%" }}
          //   border="1px blue solid"
          >
            <Box textAlign="left">
              <Text fontSize="0.8rem">MY OVERVIEW</Text>
            </Box>
            <Box bg="#F2F2F2" p="1rem" mt="1rem">
              <Text fontSize="0.8rem">{`Hello, ${data.user.name}`}</Text>
              <Text fontSize="0.7rem" mt="1rem" color={"gray.600"}>
                From your My Account Dashboard you have the ability to view a
                snapshot of your recent account activity and update your account
                information. Select a link below to view or edit information.
              </Text>
            </Box>
            <Box
              //   border="1px blue solid"
              display="flex"
              justifyContent="flex-start"
              flexDirection={{ base: "column", md: "row", lg: "row" }}
              alignItems="center"
              my="1rem"
              gap="1rem"
            >
              <Box textAlign="left" w={{ base: "100%", md: "50%", lg: "50%" }}>
                <Text fontSize="0.8rem">MY ACCOUNT INFORMATION</Text>
                <Text
                  fontSize="0.8rem"
                  mt="0.5rem"
                >{`Name: ${data.user.name}`}</Text>
                <Text
                  fontSize="0.8rem"
                  mt="0.2rem"
                >{`Gender: ${data.user.gender}`}</Text>
              </Box>
            </Box>
            <Divider my="1.5rem" />
            <Box
              //   border="1px blue solid"
              display="flex"
              justifyContent="center"
              flexDirection={{ base: "column", md: "row", lg: "row" }}
              alignItems="center"
              gap="1rem"
              my="1rem"
            >
              <Box textAlign="left" w={{ base: "100%", md: "50%", lg: "50%" }}>
                <Text fontSize="0.8rem">MY ADDRESS BOOK</Text>
                <Text fontSize="0.75rem" mt="0.5rem" fontWeight={600}>
                  Default Billing Address
                </Text>
                <Text fontSize="0.75rem" mt="0.2rem">
                  You have not set a default billing address.
                </Text>
              </Box>
              <Box textAlign="left" w={{ base: "100%", md: "50%", lg: "50%" }}>
                <br></br>
                <Text fontSize="0.75rem" mt="0.5rem" fontWeight={600}>
                  Default Shipping Address
                </Text>
                <Text fontSize="0.75rem" mt="0.2rem">
                  You have not set a default shipping address.
                </Text>
              </Box>
            </Box>
            <Divider my="1.5rem" />
            <Box
              //   border="1px blue solid"
              display="flex"
              justifyContent="flex-start"
              flexDirection={{ base: "column", md: "row", lg: "row" }}
              alignItems="center"
              gap="1rem"
              my="1rem"
            >
              <Box textAlign="left" w={{ base: "100%", md: "50%", lg: "50%" }}>
                <Text fontSize="0.8rem">EASY-ACCESS LOGIN</Text>
                <Text fontSize="0.75rem" mt="0.5rem" fontWeight={600}>
                  Do not permit automatic identification prior to logging in!
                </Text>
              </Box>
            </Box>
            <Divider my="1.5rem" />
          </Box>
        </Stack>
      </>
    )
  );
};

export default MyAccount;