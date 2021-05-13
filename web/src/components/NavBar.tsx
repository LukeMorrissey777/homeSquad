import { Box, Link, Stack, Text, Flex, Spacer, Button } from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
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
          <Button colorScheme="blue" color="white">
            Register
          </Button>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Text mr={5} fontSize="x-large" fontWeight="bold" color="white">
        {data.me.username}
      </Text>
    );
  }
  return (
    <Box bg="teal.900" p={4} ml={"auto"}>
      <Flex>
        <Text ml={5} fontSize="x-large" fontWeight="bold" color="white">
          HomeSquad
        </Text>
        <Spacer />
        {body}
      </Flex>
    </Box>
  );
};
