import { IconButton } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Center, Heading, HStack, Spacer, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { DeleteItemModal } from "./DeleteItemModal";

interface GroceryCardProps {
  homeId: number;
  author: string;
  item: string;
  groceryId: number;
  completed: boolean;
}

export const GroceryCard: React.FC<GroceryCardProps> = ({
  homeId,
  groceryId,
  author,
  item,
  completed,
}) => {
  const [completedChecked, setCompletedChecked] = useState(completed);

  const handleClickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompletedChecked(e.target.checked);
  };
  const renderHeading = () => {
    if (completedChecked) {
      return (
        <Heading as="del" fontSize="xl">
          {item}
        </Heading>
      );
    }
    return <Heading fontSize="xl">{item}</Heading>;
  };
  return (
    <Center>
      <Box
        w="89%"
        backgroundColor="white"
        p={4}
        m={4}
        shadow="md"
        borderWidth="0px"
      >
        <HStack>
          <Box w="80%">
            {renderHeading()}
            <Text mt={3}>- {author}</Text>
          </Box>
          <Spacer />
          <Center>
            <Checkbox
              size="lg"
              m={5}
              isChecked={completedChecked}
              onChange={handleClickChange}
            />
            <DeleteItemModal
              homeId={homeId}
              id={groceryId}
              text={item}
              type="Grocery Item"
            />
          </Center>
        </HStack>
      </Box>
    </Center>
  );
};
