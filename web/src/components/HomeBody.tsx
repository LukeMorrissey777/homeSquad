import { Button, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/layout";
import { SP } from "next/dist/next-server/lib/utils";
import { stringify } from "querystring";
import React, { useState } from "react";
import { useMeQuery, useHomeQuery, HomeQuery } from "../generated/graphql";
import { MinusHomeModal } from "./MinusHomeModal";
import { PostColumn } from "./PostColumn";

interface HomeBodyProps {
  userId: number | null;
  homeId: number | null;
}

export const HomeBody: React.FC<HomeBodyProps> = ({ homeId, userId }) => {
  let header = null;
  let deleteButton = null;

  if (!userId) {
    header = <>Not Logged In</>;
  } else if (!homeId) {
    header = <>Please choose a home to view</>;
  } else {
    const [{ data: homeData, fetching: homeFetching }] = useHomeQuery({
      variables: { id: homeId },
    });
    if (homeFetching) {
      header = <>Loading ...</>;
    } else if (!homeData?.home) {
      header = <>No home</>;
    } else {
      header = <>{homeData.home.name}</>;
      deleteButton = <MinusHomeModal userId={userId} home={homeData.home} />;
    }
  }

  return (
    <>
      <Box bg="teal.900" p={8} ml={"auto"}></Box>
      <Box bg="teal.700" p={4} ml={"auto"}>
        <Flex>
          <Spacer />
          <Center>
            <Text fontSize="3xl" fontWeight="bold" color="white">
              {header}
            </Text>
          </Center>
          <Spacer />
          {deleteButton}
        </Flex>
      </Box>
      <Flex>
        <Box flex={1} bg="teal.100">
          <PostColumn homeId={homeId} />
        </Box>
        <Box flex={1} bg="teal.100">
          World
        </Box>
      </Flex>
    </>
  );
};
