import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Center, Heading, HStack, Spacer, Text } from "@chakra-ui/layout";
import React from "react";
import { Col } from "react-bootstrap";
import { DeleteItemModal } from "./DeleteItemModal";

interface PostCardProps {
  homeId: number;
  author: string;
  text: string;
  postId: number;
}

export const PostCard: React.FC<PostCardProps> = ({
  homeId,
  postId,
  author,
  text,
}) => {
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
          <Box w="90%">
            <Heading fontSize="xl">{text}</Heading>
            <Text mt={3}>- {author}</Text>
          </Box>
          <Spacer />
          <DeleteItemModal
            homeId={homeId}
            id={postId}
            text={text}
            type="Post"
          />
        </HStack>
      </Box>
    </Center>
  );
};
