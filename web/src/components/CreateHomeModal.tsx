import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Center,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useCreateHomeMutation } from "../generated/graphql";

interface CreateHomeModalProps {}

export const CreateHomeModal: React.FC<CreateHomeModalProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [homeName, setHomeName] = useState("");
  const [resMessage, setResMessage] = useState(<></>);

  const [, createHome] = useCreateHomeMutation();

  const handleNameChange = (event: any) => setHomeName(event.target.value);
  const onCloseWrapper = () => {
    setHomeName("");
    setResMessage(<></>);
    onClose();
  };

  const handleCreatePressed = async () => {
    const response = await createHome({ name: homeName });
    if (response.data?.createHome.errors) {
      setResMessage(
        <>
          {response.data.createHome.errors.map((error) => {
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
      setResMessage(
        <>
          <Alert mt={5} status="success">
            <AlertIcon />
            Successfully created the home!
          </Alert>
        </>
      );
      console.log("Success");
    }
  };

  return (
    <>
      <Button ml={5} colorScheme="teal" onClick={onOpen}>
        Create a Home
      </Button>

      <Modal isOpen={isOpen} onClose={onCloseWrapper}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Home</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Center mr={5}>Name:</Center>
              <Input
                colorScheme="teal"
                onChange={handleNameChange}
                placeholder="Put your home name here"
              />
            </Flex>
            {resMessage}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onCloseWrapper}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleCreatePressed}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
