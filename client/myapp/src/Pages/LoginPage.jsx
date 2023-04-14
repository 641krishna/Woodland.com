import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { authLogin } from "../Redux/auth/action";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../Components/TextInput";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isLoading, isError, message, data } = useSelector((store) => {
    // console.log(store.auth.userLogin)
    return {
      isLoading: store.auth.userLogin.isLoading,
      isError: store.auth.userLogin.isError,
      message: store.auth.userLogin.message,
      data: store.auth.data,
    };
  }, shallowEqual);

  // console.log(isLoading, isError, message, data);

  return (
    <Box
      w={["98%", "95%", "85%", "60%"]}
      margin="auto"
      flexDirection="column"
      fontFamily="Montserrat"
      mt="1.7rem"
      mb="3rem"
      //   border="1px red solid"
    >
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg="white">
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"2xl"} textAlign={"center"} fontWeight={400}>
              ALREADY REGISTERED?
            </Heading>
            <Text fontSize={"sm"} color={"gray.600"}>
              If you have an account with us, please log in.
            </Text>
          </Stack>
          <Box bg="white" p={8}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .required("Password required")
                  .min(6, "Password is too short"),

                email: Yup.string()
                  .email("Invalid Email")
                  .lowercase(`Email should be in lowercase eg: abc@gmail.com`)
                  .strict()
                  .required("Email required"),
              })}
              onSubmit={(values, actions) => {
                dispatch(authLogin(values)).then((res) => {
                  toast({
                    title: res.payload.message,
                    status:
                      res.payload.message == "Invalid credentials"
                        ? "error"
                        : res.payload.message ==
                          "User does not exits, try Sign up"
                        ? "error"
                        : res.payload.message == "Logged In Successfully"
                        ? "success"
                        : "",
                    isClosable: true,
                    duration: 1200,
                    containerStyle: {
                      borderRadius: "0px",
                      fontFamily: "poppins",
                      fontSize: "0.8rem",
                      fontWeight: "100",
                      width: "auto",
                      minWidth: "0%",
                    },
                  });
                  // console.log(res.payload.message);
                  if (res.payload.message == "Logged In Successfully") {
                    navigate("/", { replace: true });
                    // window.location.reload();
                  }
                }).catch((err)=>{
                  console.log(err);
                });
                // console.log(values);
                actions.resetForm();
              }}
            >
              {(formik) => (
                <Stack spacing={4} as="form" onSubmit={formik.handleSubmit}>
                  <TextInput
                    id="signemail"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    label="Email address"
                  />

                  <FormControl
                    id="password"
                    isRequired
                    isInvalid={
                      formik.errors.password && formik.touched.password
                    }
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter Password"
                      />

                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Stack>
                  <Stack pt={3}>
                    <Link
                      href="/resetpassword"
                      color={"blue.400"}
                      _hover={{ textDecoration: "none" }}
                    >
                      Forgot Password?
                    </Link>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Need an account?{" "}
                      <Link
                        href="/signup"
                        color={"blue.400"}
                        _hover={{ textDecoration: "none" }}
                        ml="0.3rem"
                      >
                        Sign Up
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              )}
            </Formik>
          </Box>
          <Box display="flex" justifyContent="center">
            <Text
              fontSize={{ base: "0.7rem", md: "0.85rem", lg: "0.85rem" }}
              color={"gray.600"}
              textAlign="left"
            >
              At Woodland, we keep your information secure. As a result, it
              will be necessary for you to log in to your account before you are
              able to place an order or change the information on your account.
              You will be asked to log in to complete your order even if you
              have already been greeted on the website.
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default LoginPage;