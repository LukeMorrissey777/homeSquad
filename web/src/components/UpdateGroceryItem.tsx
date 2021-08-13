import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Center, HStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React from "react";
import { useUpdateGroceryItemMutation } from "../generated/graphql";
import { RadioCard } from "./RadioCard";

interface UpdateGroceryItemProps {
  completedChanged: boolean;
  groceryId: number;
  homeId: number;
  completed: boolean;
}

export const UpdateGroceryItem: React.FC<UpdateGroceryItemProps> = ({
  completedChanged,
  groceryId,
  homeId,
  completed,
}) => {
  const [, updateGroceryItem] = useUpdateGroceryItemMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateClick = async () => {
    onOpen();
    const response = await updateGroceryItem({
      id: groceryId,
      completed,
      homeId,
    });
  };

  var buttonBody = <></>;
  if (completedChanged) {
    buttonBody = <Button onClick={handleUpdateClick}>Update</Button>;
  }

  return (
    <>
      {buttonBody}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Grocery Item Updated Successfully</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
