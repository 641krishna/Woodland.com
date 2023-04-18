import React from "react";
import {
  Badge,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SiLinkedin } from "react-icons/si";
import { FaGithubSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const AboutMe = () => {
  const skills = [
    {
      title: "React.Js",
    },
    {
      title: "Redux",
    },
    {
      title: "CSS",
    },
    {
      title: "Javascript",
    },
    {
      title: "HTML",
    },
    {
      title: "Chakra UI",
    },
    {
      title: "Node.JS",
    },
    {
      title: "Express.Js",
    },
    {
      title: "MongoDB",
    },
    {
      title: "DSA",
    },
    {
      title: "GitHub",
    },
  ];
  return (
    <Flex
      h={{ base: "auto", md: "100vh", lg: "100vh" }}
      align="center"
      justifyContent="center"
      w={["98%", "95%", "85%", "60%"]}
      margin="auto"
      fontFamily="Montserrat"
    >
      <Center
        py={6}
        // border="1px red solid"
        w={{ base: "100%", md: "auto", lg: "auto" }}
      >
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ base: "100%", md: "50rem" }}
          height={{ base: "auto", md: "35rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          //   boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} justifyContent="center" alignItems="center">
            <Image
              objectFit="cover"
              boxSize="70%"
              src={
                "https://avatars.githubusercontent.com/u/105938098?v=4"
              }
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily="poppins" my="1rem">
              Shrikrishna Aluri
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              Full Stack Web Developer
            </Text>
            <Text
              textAlign={"left"}
              color={useColorModeValue("gray.700", "gray.400")}
              fontSize="0.8rem"
              px={3}
            >
              Excellent understanding of frontend and backend programming
              languages and technology stacks.Capable of writing
              production-ready code using ReactJS, Redux, and CSS on the
              frontend, NodeJS, and Express on the backend.
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" my="2rem">
              {skills?.map((el) => (
                <Badge
                  px={2}
                  py={1}
                  bg="gray.50"
                  fontWeight={"400"}
                  key={el.title}
                >
                  {`#${el.title}`}
                </Badge>
              ))}
            </Grid>

            <Center p={8} w={"full"}>
              <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
                <Button
                  as="a"
                  w={"full"}
                  colorScheme={"gray"}
                  leftIcon={<CgProfile size="0.9rem" />}
                  href="641krishna.github.io/"
                >
                  <Center>
                    <Text>Portfolio</Text>
                  </Center>
                </Button>

                <Button
                  as="a"
                  w={"full"}
                  variant={"outline"}
                  colorScheme={"whatsapp"}
                  leftIcon={<FaGithubSquare size="0.9rem" />}
                  href="https://github.com/641krishna"
                >
                  <Center>
                    <Text>Github</Text>
                  </Center>
                </Button>

                <Button
                  as="a"
                  w={"full"}
                  colorScheme={"linkedin"}
                  leftIcon={<SiLinkedin size="0.85rem" />}
                  href="https://www.linkedin.com/in/krishna-aluri-b9613515a/"
                >
                  <Center>
                    <Text>Linkedin</Text>
                  </Center>
                </Button>
              </Stack>
            </Center>
          </Stack>
        </Stack>
      </Center>
    </Flex>
  );
};

export default AboutMe;