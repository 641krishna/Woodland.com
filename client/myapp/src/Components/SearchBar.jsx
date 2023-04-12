import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import "./SearchBar.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleOnSearch = async (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        if (string) {
            let res = await axios.get(`http://localhost:8080/product`, {
                params: {
                    search: string,
                    limit: 5,
                },
            });
            console.log(res.data.Products)
            setData([...res.data.Products]);
        }

        // console.log(string, results);
        // console.log(string);
    };

    const handleOnFocus = () => {
        console.log("Focused");
    };

    const handleOnClear = () => {
        console.log("Cleared");
    };

    const handleOnSelect = (item) => {
        // the item selected
        navigate(`/product/${item._id}`);
        // console.log(item);
    };
    const handleOnHover = (results) => {
        // console.log(result);
    };
    //   console.log(data);

    const formatResult = (item) => {
        // console.log(item._id);
        let image = item.images.split("|");
        image = image[1];
        // console.log(image);

        return (
            <HStack>
                <Image boxSize={{ base: "2rem", md: 50, lg: 50 }} src={image} />
                <Text className="ReactAutoCompleteCss">{item.title}</Text>
            </HStack>
        );
    };

    return (
        // <Stack>
        <ReactSearchAutocomplete
            // onSearch={optimisedVersion}

            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            inputDebounce={800}
            items={data}
            formatResult={formatResult}
            // autoFocus
            fuseOptions={{ keys: ["title", "brand"] }}
            resultStringKeyName="title"
            onHover={handleOnHover}
            onFocus={handleOnFocus}
            placeholder="Search for product, brands and more"
            onClear={handleOnClear}
            styling={{
                borderRadius: "5px",
                boxShadow: "none",
                border: "1px solid #e5e5e5",
                fontSize: "0.65rem",
                height: "2rem",
                overflow: "scroll",
                fontFamily: "poppins",
            }}
        />
        // </Stack>
    );
};

export default SearchBar;