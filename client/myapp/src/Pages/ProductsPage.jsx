import React from 'react';
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  CardFooter,
  Divider,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  Skeleton,
  Heading,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { TbShoppingCartOff } from "react-icons/tb";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const ProductsPage = () => {
  return (
    <div>ProductsPage</div>
  )
}

export default ProductsPage