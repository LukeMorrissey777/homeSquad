import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spacer, Center } from "@chakra-ui/react";
import React from "react";
import { HomeQuery } from "../generated/graphql";
import { MinusHomeModal } from "./MinusHomeModal";

interface HomeHeaderProps {
  userId: number | null;
  homeId: number | null;
  homeData: HomeQuery | undefined;
  homeFetching: boolean;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ userId, homeId, homeData, homeFetching }) => {
  let header = null;
  let deleteButton = null;

  if (!userId) {
    header = <>Not Logged In</>;
  } else if (!homeId) {
    header = <>Please choose a home to view</>;
  } else {
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
      <Box bg="teal.900" h="8vh" ml={"auto"}></Box>
      <Box bg="teal.700" p={4} h="10vh" ml={"auto"}>
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
    </>
  );
};
