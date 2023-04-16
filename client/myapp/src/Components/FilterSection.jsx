import React from 'react';
import { useEffect, useRef, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Stack,
    RadioGroup,
    Radio,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    Text,
} from "@chakra-ui/react";

import { useLocation, useSearchParams } from "react-router-dom";
import { filterData } from "./FilterData";
import { HiFilter } from "react-icons/hi";
import { AiOutlineSortAscending } from "react-icons/ai";


const FilterSection = ({ currentPage }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = new URLSearchParams(useLocation().search);
    const paramsArr = Object.values(Object.fromEntries(search.entries()));

    const [brand, setBrand] = useState(searchParams.get("brand") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [color, setColor] = useState(searchParams.get("color") || "");
    // const [category, setCategory] = useState(searchParams.getAll("genre") || []);
    const [sort, setSort] = useState(searchParams.get("sortBy") || "asc");

    const [orderBy, setOrderBy] = useState(
        searchParams.get("orderBy") || "price"
    );

    const handleFilter = (e) => {
        const { value, name } = e.target;
        if (name == "Brands") {
            setBrand(value);
        } else if (name == "Category") {
            setCategory(value);
        } else if (name == "Colour") {
            setColor(value);
        }
    };

    const handleSortBy = (value) => {
        // console.log(value);
        if (sort == "asc") {
            setSort("desc");
        } else {
            setSort("asc");
        }
    };

    useEffect(() => {
        const params = {};
        brand && (params.brand = brand);
        category && (params.category = category);
        color && (params.color = color);
        sort && (params.sort = sort);
        orderBy && (params.orderBy = orderBy);
        currentPage && (params.page = currentPage);

        setSearchParams(params);
    }, [brand, category, color, setSearchParams, sort, orderBy, currentPage]);

    const handleReset = () => {
        searchParams.delete("category");
        searchParams.delete("brand");
        searchParams.delete("color");
        setSearchParams(searchParams);
        window.location.reload();
    };


    return (
        <>
            <Stack
                w="100%"
                display={{ base: "none", md: "flex", lg: "flex" }}
                fontFamily="Montserrat"
            >
                <Button
                    onClick={() => handleReset()}
                    borderRadius="0"
                    // border="1px red solid"
                    fontSize="0.8rem"
                >
                    RESET
                </Button>

                {filterData.map((el) => (
                    <AccordionFilter
                        label={el.label}
                        child={el.children}
                        handleFilter={handleFilter}
                        key={el.label}
                        brand={brand}
                        category={category}
                        color={color}
                        paramsArr={paramsArr}
                    />
                ))}

                <Box mt="1rem">
                    <SortBy handleSort={handleSortBy} />
                </Box>
            </Stack>

            <Box
                display={{ base: "flex", md: "none", lg: "none" }}
                justifyContent="space-between"

            >
                <Box>
                    <MobileFilterSection
                        handleFilter={handleFilter}
                        brand={brand}
                        category={category}
                        color={color}
                        paramsArr={paramsArr}
                    />
                </Box>
                <Box ml="20%">
                    <SortBy handleSort={handleSortBy} />
                </Box>
            </Box>
        </>
    );
}

export default FilterSection;

const AccordionFilter = ({
    label,
    child,
    handleFilter,
    brand,
    category,
    color,
    paramsArr,
}) => {
    // console.log(paramsArr);
    return (
        <Accordion defaultIndex={[0]} allowMultiple
        // border="1px blue solid"
        >
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left" fontSize="0.8rem">
                            {label}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} h="10rem" overflow="auto">
                    <RadioGroup size="sm">
                        <Stack direction="column">
                            {child.map((el) => (
                                <Radio
                                    value={el.value}
                                    name={label}
                                    onChange={handleFilter}
                                    key={el.title}
                                    defaultChecked={paramsArr.includes(el.value)}
                                >
                                    <Text fontSize="0.8rem">{el.title}</Text>
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

const MobileFilterSection = ({
    handleFilter,
    brand,
    category,
    color,
    paramsArr,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
                leftIcon={<HiFilter />}
                size="sm"
                colorScheme="gray"
                onClick={onOpen}
                borderRadius="0"
            >
                Filter
            </Button>
            <Drawer onClose={onClose} isOpen={isOpen} size="xs">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{` Filter`}</DrawerHeader>
                    <DrawerBody>
                        {filterData.map((el) => (
                            <AccordionFilter
                                label={el.label}
                                child={el.children}
                                handleFilter={handleFilter}
                                key={el.label}
                                brand={brand}
                                category={category}
                                color={color}
                                paramsArr={paramsArr}
                            />
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export const SortBy = ({ handleSort }) => {
    return (
        <Menu closeOnSelect={false} matchWidth={true}>
            <MenuButton
                as={Button}
                colorScheme="gray"
                size="sm"
                borderRadius="0"
                variant="outline"
                leftIcon={<AiOutlineSortAscending />}
                w="full"
                border="1px gray solid"
                fontSize="0.8rem"
            >
                Sort By
            </MenuButton>
            <MenuList fontSize="0.8rem">
                <MenuOptionGroup
                    defaultValue="asc"
                    title="Order"
                    type="radio"
                    onChange={(e) => handleSort(e)}
                >
                    <MenuItemOption value="asc">Price: Low to High</MenuItemOption>
                    <MenuItemOption value="desc">Price: High to Low</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
};