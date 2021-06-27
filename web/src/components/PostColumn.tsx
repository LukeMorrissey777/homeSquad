import { Button } from "@chakra-ui/button";
import { Center, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useState } from "react";

interface PostColumnProps {
  homeId: number | null;
}

export const PostColumn: React.FC<PostColumnProps> = ({}) => {
  const [newPostText, setNewPostText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setNewPostText(inputValue);
  };
  return (
    <>
      <Center>
        <Text fontSize="3xl" fontWeight="bold" color="teal.900">
          Posts
        </Text>
      </Center>
      <Center>
        <Textarea
          placeholder="Create a new post!"
          backgroundColor="white"
          m="3"
          onChange={(e) => console.log}
        />
      </Center>
      <Flex>
        <Spacer />
        <Button colorScheme="teal" m="3">
          Post
        </Button>
      </Flex>
    </>
  );
};
