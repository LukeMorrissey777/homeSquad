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
  Center,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import {
  Home,
  HomeQuery,
  Maybe,
  useHomeQuery,
  useMeQuery,
} from "../generated/graphql";
import NextLink from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AddHomeModal } from "./AddHomeModal";

interface NavBarProps {
  setHomeId: Dispatch<SetStateAction<number | null>>;
  setUserId: Dispatch<SetStateAction<number | null>>;
}

export const NavBar: React.FC<NavBarProps> = ({ setHomeId, setUserId }) => {
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
        <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
          Your Homes
        </MenuButton>
        <MenuList>
          {homes.map((home) => {
            return (
              <MenuItem
                key={home.id}
                id={home.id.toString()}
                onClick={() => setHomeId(home.id)}
              >
                {home.name}
              </MenuItem>
            );
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
    setUserId(data.me.id);
    homeList = getHomeList(data.me.homes);
    body = (
      <>
        <AddHomeModal />
        <Center>
          <Text ml={5} mr={5} fontSize="large" fontWeight="bold" color="white">
            {data.me.username}
          </Text>
        </Center>
      </>
    );
  }
  return (
    <Box bg="teal.700" p={2.5} ml={"auto"}>
      <Flex>
        <Center>
          <Text ml={5} fontSize="large" fontWeight="bold" color="white">
            HomeSquad
          </Text>
        </Center>

        <Spacer />
        {homeList}
        {body}
      </Flex>
    </Box>
  );
};
