import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


function Pagination({ current, onChange, totalPages, AvailableData }) {
    // console.log(AvailableData);

    const prev = (
        <Button
            colorScheme="blue"
            borderRadius={0}
            bg="white"
            border="1px"
            borderColor="#2E3337"
            color="#2E3337"
            _hover={{ bg: "teal.50" }}
            size="sm"
            padding="1rem 0.6rem"
            marginTop="1rem"
            disabled={current === 1}
            onClick={() => {
                onChange(current - 1);
            }}
        >
            <ChevronLeftIcon />
        </Button>
    );
    const currentPage = (
        <Button
            colorScheme="blue"
            borderRadius={0}
            bg="#2E3337"
            border="1px"
            borderColor="#2E3337"
            color="white"
            _hover={{ bg: "#2E3337", color: "white" }}
            size="sm"
            padding="1rem 0.6rem"
            marginTop="1rem"
        >
            {current}
        </Button>
    );
    const nextpage = (
        <Button
            colorScheme="blue"
            borderRadius={0}
            bg="white"
            border="1px"
            borderColor="#2E3337"
            color="#2E3337"
            _hover={{ bg: "#2E3337", color: "white" }}
            size="sm"
            padding="1rem 0.6rem"
            marginTop="1rem"
            onClick={() => {
                onChange(current + 1);
            }}
            disabled={AvailableData == 0}
        >
            {current + 1}
        </Button>
    );

    const next = (
        <Button
            colorScheme="blue"
            borderRadius={0}
            bg="white"
            border="1px"
            borderColor="#2E3337"
            color="#2E3337"
            _hover={{ bg: "#2E3337", color: "white" }}
            size="sm"
            padding="1rem 0.6rem"
            marginTop="1rem"
            onClick={() => {
                onChange(current + 1);
            }}
            disabled={AvailableData == 0}
        >
            <ChevronRightIcon />
        </Button>
    );

    return (
        <Box

            w={["98%", "95%", "85%", "60%"]}

            display="flex"
            justifyContent="flex-end"
            margin="auto"
        >
            <Box

                display="flex"
                alignItems="center"
                justifyContent="flex-end"

                gap="0.5rem"
            >
                {prev}
                {currentPage}
                {nextpage}
                <Box>--</Box>
                {next}

            </Box>
        </Box>
    );
}

export default Pagination;