import {
    Box,
    chakra,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    useColorModeValue,
    Image,
    useToast,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { CheckIcon } from "@chakra-ui/icons";

const Logo = (props) => {
    return (
        <Image mt='-3rem'
            src="https://www.woodlandworldwide.com/images/h-logo.png"
            w="10rem"
        />
    );
};

const SocialButton = ({ children, label, href }) => {
    return (
        <chakra.button
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={"500"} fontSize={"sm"} mb={2}>
            {children}
        </Text>
    );
};

export default function LargeWithNewsletter() {
    return (
        <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}

        >


            <Container as={Stack} maxW={"6xl"} py={10} >
                <SimpleGrid
                    templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
                    spacing={8}
                >
                    <Stack spacing={6} >
                        <Box>
                            <Logo color={useColorModeValue("gray.700", "white")} />
                        </Box>
                        <Stack align={"flex-start"} textAlign="left">
                            <ListHeader>Service & Security</ListHeader>
                            <Text fontSize="0.8rem" fontWeight="500">
                                <CheckIcon fontSize="0.7rem" color="green" />
                                &nbsp; Fast delivery
                            </Text>
                            <Text fontSize="0.65rem" color="gray.500">
                                Delivery within 2 business days
                            </Text>
                            <Text fontSize="0.8rem" fontWeight="500">
                                <CheckIcon fontSize="0.7rem" color="green" />
                                &nbsp; Free returns within 30 days
                            </Text>
                            <Text fontSize="0.65rem" color="gray.500">
                                Convenient return service
                            </Text>
                            <Text fontSize="0.8rem" fontWeight="500">
                                <CheckIcon fontSize="0.7rem" color="green" />
                                &nbsp; Secure payment and data protection
                            </Text>
                            <Text fontSize="0.65rem" color="gray.500">
                                SSL encryption for secure transactions and personal data
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack align={"flex-start"} textAlign="left">
                        <ListHeader>Company</ListHeader>
                        <Link href={"#"}>About us</Link>
                        <Link href={"#"}>Blog</Link>
                        <Link href={"#"}>Contact us</Link>
                        <Link href={"#"}>Pricing</Link>
                        <Link href={"#"}>Testimonials</Link>
                    </Stack>
                    <Stack align={"flex-start"} textAlign="left">
                        <ListHeader>Support</ListHeader>
                        <Link href={"#"}>Help Center</Link>
                        <Link href={"#"}>Terms of Service</Link>
                        <Link href={"#"}>Legal</Link>
                        <Link href={"#"}>Privacy Policy</Link>
                        <Link href={"#"}>Gift card</Link>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <ListHeader>GET TREND UPDATES, STYLE TIPS AND MORE</ListHeader>
                        <Stack direction={"row"}>
                            <EmailSubscription />
                        </Stack>
                        <br />
                        <Stack spacing={6}>
                            <Stack direction={"row"} spacing={6}>
                                <SocialButton label={"Twitter"} href={"#"}>
                                    <FaTwitter />
                                </SocialButton>
                                <SocialButton label={"YouTube"} href={"#"}>
                                    <FaYoutube />
                                </SocialButton>
                                <SocialButton label={"Instagram"} href={"#"}>
                                    <FaInstagram />
                                </SocialButton>
                            </Stack>
                            <Text fontSize={"sm"}>
                                © 2023 woodland.com. All rights reserved
                            </Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
}


const EmailSubscription = () => {
    const [email, setEmail] = useState("");
    const [state, setState] = useState("initial");
    const toast = useToast();

    const [error, setError] = useState(false);

    const handleClick = () => {

        toast({
            title: "Confirmation success",
            description: "Thank you for subscribing",
            status: "success",
            duration: 9000,
            isClosable: true,
        });

    };

    return (
        <Stack
            direction={{ base: "column", md: "row" }}
            as={"form"}
            spacing={"12px"}
            onSubmit={(e) => {
                e.preventDefault();
                setError(false);
                setState("submitting");

                setTimeout(() => {
                    if (email === "fail@example.com") {
                        setError(true);
                        setState("initial");
                        return;
                    }

                    setState("success");
                    handleClick()
                }, 1000);
            }}
        >
            <FormControl>
                <Input
                    variant={"solid"}
                    borderWidth={1}
                    color={"gray.800"}
                    _placeholder={{
                        color: "gray.400",
                    }}
                    borderColor={useColorModeValue("gray.300", "gray.700")}
                    id={"email"}
                    type={"email"}
                    required
                    placeholder={"Your Email"}
                    aria-label={"Your Email"}
                    value={email}
                    disabled={state !== "initial"}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl w={{ base: "100%", md: "40%" }}>
                <Button
                    colorScheme={state === "success" ? "green" : "blue"}
                    isLoading={state === "submitting"}
                    w="100%"
                    type={state === "success" ? "button" : "submit"}
                >
                    {state === "success" ? <CheckIcon /> : <BiMailSend />}
                </Button>
            </FormControl>
        </Stack>
    );
};