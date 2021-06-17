import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  Text,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";
import React, { useState } from "react";
import {
  Home,
  useDeleteHomeMutation,
  useLeaveHomeMutation,
  User,
} from "../generated/graphql";
import { useRouter } from "next/router";

interface MinusHomeModalProps {
  userId: number;
  home: {
    __typename?: "Home" | undefined;
  } & Pick<Home, "id" | "name"> & {
      owner?:
        | Maybe<
            {
              __typename?: "User" | undefined;
            } & Pick<User, "id" | "username">
          >
        | undefined;
      users?:
        | Maybe<
            ({
              __typename?: "User" | undefined;
            } & Pick<User, "id" | "username">)[]
          >
        | undefined;
    };
}

export const MinusHomeModal: React.FC<MinusHomeModalProps> = ({
  userId,
  home,
}) => {
  const router = useRouter();
  const [, deleteHome] = useDeleteHomeMutation();
  const [, leaveHome] = useLeaveHomeMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resMessage, setResMessage] = useState(<></>);
  const [minusCompleted, setMinusCompleted] = useState(false);

  let mode = "Leave";
  if (userId === home.owner?.id) {
    mode = "Delete";
  }

  const onCloseWrapper = () => {
    if (minusCompleted) {
      router.reload();
    } else {
      onClose();
    }
  };

  const handleButtonPress = async () => {
    if (mode === "Leave") {
      await handleLeavePressed();
    } else {
      await handleDeletePressed();
    }
  };
  const handleDeletePressed = async () => {
    const response = await deleteHome({ id: home.id });

    if (response.data?.deleteHome?.errors) {
      setResMessage(
        <>
          {response.data.deleteHome.errors.map((error) => {
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
      setMinusCompleted(true);
      setResMessage(
        <>
          <Alert mt={5} status="success">
            <AlertIcon />
            You successfully deleted {home.name}
          </Alert>
        </>
      );
    }
  };
  const handleLeavePressed = async () => {
    const response = await leaveHome({ id: home.id });

    if (response.data?.leaveHome?.errors) {
      setResMessage(
        <>
          {response.data.leaveHome.errors.map((error) => {
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
      setMinusCompleted(true);
      setResMessage(
        <>
          <Alert mt={5} status="success">
            <AlertIcon />
            You successfully left {home.name}
          </Alert>
        </>
      );
    }
  };
  return (
    <>
      <Center>
        <IconButton
          size="sm"
          aria-label="Delete/Leave Home"
          ml={5}
          colorScheme="red"
          icon={<DeleteIcon />}
          onClick={onOpen}
        />
      </Center>
      <Modal isOpen={isOpen} onClose={onCloseWrapper}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{mode} a Home</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Text>
                Are you sure that you want to {mode.toLowerCase()} the home
                called "{home.name}"?
              </Text>
            </Center>
            {resMessage}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onCloseWrapper}>
              Close
            </Button>
            <Button
              colorScheme="red"
              width="24"
              onClick={handleButtonPress}
              disabled={minusCompleted}
            >
              {mode}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
