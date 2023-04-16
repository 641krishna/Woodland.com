import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    FormErrorMessage,
    useToast,
    Toast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { forgotPassword } from "../Redux/auth/action";
import TextInput from "./TextInput";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <Box
            w={["98%", "95%", "85%", "60%"]}
            margin="auto"
            flexDirection="column"
            fontFamily="Montserrat"
            mt="1.7rem"
            mb="3rem"
        // border="1px red solid"
        >
            <Flex minH={"100vh"} align={"center"} justify={"center"} bg="white">
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"2xl"} textAlign={"center"} fontWeight={400}>
                            FORGOT PASSWORD?
                        </Heading>
                        <Text fontSize={"sm"} color={"gray.600"}>
                            Reset Password
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
                                dispatch(forgotPassword(values)).then((res) => {
                                    toast({
                                        title: res.payload.message,
                                        status:
                                            res.payload.message ==
                                                "User does not exits, try Signing up"
                                                ? "error"
                                                : res.payload.message == "Password updated successfully"
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

                                    if (res.payload.message == "Password updated successfully") {
                                        navigate("/login", { replace: true });

                                        // setButtonText("Go to Login Page");
                                    }
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
                                        <FormLabel>Reset Password</FormLabel>
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
                                            Reset Password
                                        </Button>
                                    </Stack>
                                </Stack>
                            )}
                        </Formik>
                    </Box>
                </Stack>
            </Flex>
        </Box>
    );
};

export default ResetPassword;