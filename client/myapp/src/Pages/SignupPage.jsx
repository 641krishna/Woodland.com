import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  RadioGroup,
  Radio,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../Components/TextInput";
import { useDispatch } from "react-redux";
import { authRegister } from "../Redux/auth/action";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toast = useToast();

  return (
    <Box
      w={["98%", "95%", "85%", "60%"]}
      margin="auto"
      flexDirection="column"
      fontFamily="Montserrat"
      mt="1.7rem"
      mb="3rem"

    >
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"2xl"} textAlign={"center"} fontWeight={500}>
              CREATE AN ACCOUNT
            </Heading>
            <Text fontSize={"sm"} color={"gray.600"}>
              Please enter the following information to create your account.
            </Text>
          </Stack>
          <Box bg={useColorModeValue("white", "gray.700")} p={8}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                phone: "",
                gender: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .required("Firstname required")
                  .min(6, "Firstname is too short"),
                password: Yup.string()
                  .required("Password required")
                  .min(6, "Password is too short"),
                phone: Yup.string()
                  .required("Number required")
                  .min(10, "Number is too short")
                  .max(10),
                email: Yup.string()
                  .email("Invalid Email")
                  .lowercase(`Email should be in lowercase eg: abc@gmail.com`)
                  .strict()
                  .required("Email required"),
                gender: Yup.string().required("Gender required"),
              })}
              onSubmit={(values, actions) => {
                dispatch(authRegister(values)).then((res) => {
                  toast({
                    title: res.payload,
                    status:
                      res.payload == "User already exits, try to login"
                        ? "error"
                        : res.payload == "New User Registered"
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

                  // console.log(res.payload);

                  navigate("/login", { replace: true });
                  // window.location.reload();
                  // console.log(res);
                });
                // console.log(values);
                actions.resetForm();
              }}
            >
              {(formik) => (
                <Stack spacing={4} as="form" onSubmit={formik.handleSubmit}>
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter User Name"
                    label="User Name"
                  />
                  <TextInput
                    id="signemail"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    label="Email address"
                  />
                  <TextInput
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder="Enter Contact Number"
                    label="Contact Number"
                  />
                  <HStack>
                    <Box>
                      <FormControl
                        id="gender"
                        isRequired
                        isInvalid={
                          formik.errors.gender && formik.touched.gender
                        }
                      >
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup name="gender">
                          <Stack direction="row" spacing="1.5rem">
                            <Radio value="Male" onChange={formik.handleChange}>
                              Male
                            </Radio>
                            <Radio
                              value="Female"
                              onChange={formik.handleChange}
                            >
                              Female
                            </Radio>
                            <Radio value="Other" onChange={formik.handleChange}>
                              Other
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </HStack>
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
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link
                        href="/login"
                        color={"blue.400"}
                        _hover={{ textDecoration: "none" }}
                      >
                        Login
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

export default SignupPage;