import {
  Box,
  Link,
  Stack,
  Text,
  Flex,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { Home, Maybe, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AddHomeModal } from "./AddHomeModal";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  let homeList = null;

  const getHomeList = (
    homes:
      | Maybe<
          ({ __typename?: "Home" | undefined } & Pick<Home, "id" | "name">)[]
        >
      | undefined
  ) => {
    if (!homes) {
      return <></>;
    }
    var list = (
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Your Homes
        </MenuButton>
        <MenuList>
          {homes.map((home) => {
            return <MenuItem>{home.name}</MenuItem>;
          })}
        </MenuList>
      </Menu>
    );
    return list;
  };

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Button variant="link" colorScheme="blue" mr={10} color="white">
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button colorScheme="teal" color="white">
            Register
          </Button>
        </NextLink>
      </>
    );
  } else {
    homeList = getHomeList(data.me.homes);
    body = (
      <>
        <AddHomeModal />
        <Text ml={5} mr={5} fontSize="x-large" fontWeight="bold" color="white">
          {data.me.username}
        </Text>
      </>
    );
  }
  return (
    <Box bg="teal.900" p={4} ml={"auto"}>
      <Flex>
        <Text ml={5} fontSize="x-large" fontWeight="bold" color="white">
          HomeSquad
        </Text>
        <Spacer />
        {homeList}
        {body}
      </Flex>
    </Box>
  );
};
