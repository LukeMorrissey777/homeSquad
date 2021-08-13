import { Button, IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Center, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useDeleteGroceryItemMutation,
  useDeletePostMutation,
} from "../generated/graphql";

interface DeleteItemModalProps {
  homeId: number;
  id: number;
  text: string;
  type: "Post" | "Grocery Item";
}

export const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  homeId,
  id,
  text,
  type,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteComplete, setDeleteComplete] = useState(false);
  const [, deletePost] = useDeletePostMutation();
  const [, deleteGroceryItem] = useDeleteGroceryItemMutation();
  const [resMessage, setResMessage] = useState(<></>);

  const handleDeleteGroceryItem = async () => {
    const response = await deleteGroceryItem({ id, homeId });
    if (response.data?.deleteGroceryItem.errors) {
      setResMessage(
        <>
          {response.data.deleteGroceryItem.errors.map((error) => {
            return (
              <Alert mt={5} status="error">
                <AlertIcon />
                {error.message}
              </Alert>
            );
          })}
        </>
      );
    } else {
      setDeleteComplete(true);
      setResMessage(
        <Alert mt={5} status="success">
          <AlertIcon />
          Sucessfully Deleted Grocery Item
        </Alert>
      );
    }
  };

  const handleDeletePost = async () => {
    const response = await deletePost({ id, homeId });
    if (response.data?.deletePost.errors) {
      setResMessage(
        <>
          {response.data.deletePost.errors.map((error) => {
            return (
              <Alert mt={5} status="error">
                <AlertIcon />
                {error.message}
              </Alert>
            );
          })}
        </>
      );
    } else {
      setDeleteComplete(true);
      setResMessage(
        <Alert mt={5} status="success">
          <AlertIcon />
          Sucessfully Deleted Post
        </Alert>
      );
    }
  };

  const handleButtonPress = async () => {
    if (type == "Grocery Item") {
      await handleDeleteGroceryItem();
    } else {
      await handleDeletePost();
    }
  };

  return (
    <>
      <Center>
        <IconButton
          size="sm"
          aria-label="Delete/Leave Home"
          colorScheme="red"
          icon={<DeleteIcon />}
          onClick={onOpen}
        />
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete a {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Text>
                Are you sure that you want to delete the {type}: "{text}"?
              </Text>
            </Center>
          </ModalBody>
          {resMessage}
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="red"
              width="24"
              onClick={handleButtonPress}
              disabled={deleteComplete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
