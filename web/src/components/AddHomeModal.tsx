import { AddIcon } from "@chakra-ui/icons";
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
  IconButton,
  useRadioGroup,
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  RegisterDocument,
  useCreateHomeMutation,
  useJoinHomeMutation,
} from "../generated/graphql";
import { RadioCard } from "./RadioCard";

interface AddHomeModalProps {}

export const AddHomeModal: React.FC<AddHomeModalProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [homeName, setHomeName] = useState("");
  const [resMessage, setResMessage] = useState(<></>);
  const [addHomeType, setAddHomeType] = useState("Create");

  const [, createHome] = useCreateHomeMutation();
  const [, joinHome] = useJoinHomeMutation();

  const handleNameChange = (event: any) => setHomeName(event.target.value);
  const onCloseWrapper = () => {
    setHomeName("");
    setResMessage(<></>);
    setAddHomeType("Create");
    onClose();
  };

  const options = ["Create", "Join"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: addHomeType,
    onChange: setAddHomeType,
    value: addHomeType,
  });
  const group = getRootProps();

  const handleAddPressed = async () => {
    if (addHomeType === "Create") {
      await handleCreatePressed();
    } else {
      await handleJoinPressed();
    }
  };

  const handleJoinPressed = async () => {
    const response = await joinHome({ name: homeName });

    if (response.data?.joinHome?.errors) {
      setResMessage(
        <>
          {response.data.joinHome.errors.map((error) => {
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
            Successfully joined the home!
          </Alert>
        </>
      );
      console.log("Success Join");
    }
  };

  const handleCreatePressed = async () => {
    const response = await createHome({ name: homeName });

    if (response.data?.createHome?.errors) {
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
      console.log("Success Create");
    }
  };

  return (
    <>
      <IconButton
        aria-label="Create/Join Home"
        ml={5}
        colorScheme="teal"
        icon={<AddIcon />}
        onClick={onOpen}
      />
      {/* <Button ml={5} colorScheme="teal" onClick={onOpen}>
        Create a Home
      </Button> */}

      <Modal isOpen={isOpen} onClose={onCloseWrapper}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create/Join a Home</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <HStack {...group} ml="auto" mr="auto">
                {options.map((value) => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard key={value} {...radio}>
                      {value}
                    </RadioCard>
                  );
                })}
              </HStack>
            </Center>

            <Flex mt={5}>
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
            <Button colorScheme="teal" width="24" onClick={handleAddPressed}>
              {addHomeType}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
