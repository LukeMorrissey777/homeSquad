import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Center, Heading, HStack, Spacer, Text } from "@chakra-ui/layout";
import React from "react";
import { Col } from "react-bootstrap";

interface PostCardProps {
  author: string;
  text: string;
  postId: number;
}

export const PostCard: React.FC<PostCardProps> = ({ postId, author, text }) => {
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
          <IconButton
            size="sm"
            aria-label="Delete/Leave Home"
            colorScheme="red"
            icon={<DeleteIcon />}
          />
        </HStack>
      </Box>
    </Center>
  );
};
