import { Button, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Spacer, Text, Heading } from "@chakra-ui/layout";
import { SP } from "next/dist/next-server/lib/utils";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import {
  useMeQuery,
  useHomeQuery,
  HomeQuery,
  useCreatePostMutation,
  useCreateGroceryItemMutation,
} from "../generated/graphql";
import { MinusHomeModal } from "./MinusHomeModal";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../style/homeBody.module.css";
import { Textarea } from "@chakra-ui/textarea";
import { AlertIcon, Alert } from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";
import { PostCard } from "./PostCard";
import { GroceryCard } from "./GroceryCard";

interface HomeBodyProps {
  userId: number | null;
  homeId: number | null;
  homeData: HomeQuery | undefined;
  homeFetching: boolean;
}
const dummyData = [
  { text: "Post1", author: "ME" },
  { text: "Post2", author: "ME" },
  { text: "Post3", author: "ME" },
  { text: "Post4", author: "ME" },
  { text: "Post5", author: "ME" },
];
interface FeatureArgs {
  text: string;
  author: string;
}

export const HomeBody: React.FC<HomeBodyProps> = ({
  homeId,
  userId,
  homeData,
  homeFetching,
}) => {
  const [groceryAlertMessage, setGroceryAlertMessage] = useState(<></>);
  const [postAlertMessage, setPostAlertMessage] = useState(<></>);
  const [postText, setPostText] = useState("");
  const [groceryText, setGroceryText] = useState("");
  const [, createPost] = useCreatePostMutation();
  const [, createGroceryItem] = useCreateGroceryItemMutation();
  useEffect(() => {
    setGroceryAlertMessage(<></>);
    setPostAlertMessage(<></>);
    setPostText("");
    setGroceryText("");
  }, [homeId]);
  const posts = homeData?.home?.posts;
  const groceryItems = homeData?.home?.groceryItems;

  function Feature({ text, author, ...rest }: FeatureArgs) {
    return (
      <Center>
        <Box
          w="89%"
          backgroundColor="white"
          p={4}
          m={4}
          shadow="md"
          borderWidth="0px"
          {...rest}
        >
          <Heading fontSize="xl">{text}</Heading>
          <Text mt={3}>{author}</Text>
        </Box>
      </Center>
    );
  }
  const handleGroceryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGroceryText(e.target.value);
  };
  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handlePostClick = async () => {
    const postResponse = await createPost({
      homeId: homeId ?? -1,
      text: postText,
    });
    if (postResponse.data?.createPost.errors) {
      setPostAlertMessage(
        <>
          {postResponse.data.createPost.errors.map((error) => {
            return (
              <Alert status="error" variant="solid" height="10" mr="2">
                <AlertIcon />
                {error.message}
                <CloseButton
                  position="absolute"
                  right="2"
                  onClick={handlePostCloseButtonClicked}
                />
              </Alert>
            );
          })}
        </>
      );
    } else {
      setPostText("");
      setPostAlertMessage(
        <>
          <Alert status="success" variant="solid" height="10" mr="2">
            <AlertIcon />
            Post added successfully
            <CloseButton
              position="absolute"
              right="2"
              onClick={handlePostCloseButtonClicked}
            />
          </Alert>
        </>
      );
      console.log(homeData?.home?.posts);
    }
  };
  const handleGroceryItemClick = async () => {
    const groceryResponse = await createGroceryItem({
      homeId: homeId ?? -1,
      item: groceryText,
    });
    console.log(groceryResponse);
    if (groceryResponse.data?.createGroceryItem.errors) {
      setGroceryAlertMessage(
        <>
          {groceryResponse.data.createGroceryItem.errors.map((error) => {
            return (
              <Alert status="error" variant="solid" height="10" mr="2">
                <AlertIcon />
                {error.message}
                <CloseButton
                  position="absolute"
                  right="2"
                  onClick={handleGroceryCloseButtonClicked}
                />
              </Alert>
            );
          })}
        </>
      );
    } else {
      setGroceryText("");
      setGroceryAlertMessage(
        <>
          <Alert status="success" variant="solid" height="10" mr="2">
            <AlertIcon />
            Grocery Item added successfully
            <CloseButton
              position="absolute"
              right="2"
              onClick={handleGroceryCloseButtonClicked}
            />
          </Alert>
        </>
      );
    }
  };

  const handlePostCloseButtonClicked = () => {
    setPostAlertMessage(<></>);
  };
  const handleGroceryCloseButtonClicked = () => {
    setGroceryAlertMessage(<></>);
  };

  const renderGrocery = () => {
    if (!groceryItems) {
      return (
        <div id="postCards" className={styles.postCards}>
          Nada
        </div>
      );
    }
    return (
      <div id="postCards" className={styles.postCards}>
        {groceryItems.map((item) => {
          return (
            <GroceryCard
              completed={item.completed}
              groceryId={item.id}
              item={item.item}
              author={item.author?.username ?? ""}
            />
          );
        })}
      </div>
    );
  };

  const renderPosts = () => {
    if (!posts) {
      return (
        <div id="postCards" className={styles.postCards}>
          Nada
        </div>
      );
    }

    return (
      <div id="postCards" className={styles.postCards}>
        {posts.map((post) => {
          return (
            <PostCard
              postId={post.id}
              text={post.text}
              author={post.author?.username ?? ""}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div id="bottomPanelTable" className={styles.bottomPanelTable}>
      <Container fluid>
        <Row>
          <Col>
            <div id="postPanel" className={styles.postPanel}>
              <Container>
                <Row>
                  <Center h="8vh" w="100%">
                    <Text fontSize="3xl" fontWeight="bold" color="teal.900">
                      Posts
                    </Text>
                  </Center>
                </Row>
                <Row>
                  <div
                    id="makeShiftLine"
                    className={styles.makeShiftLine}
                  ></div>
                </Row>
                <Row>
                  {renderPosts()}
                  {/* <div id="postCards" className={styles.postCards}>
                    {dummyData.map((data) => {
                      return Feature({
                        text: data.text,
                        author: data.author,
                      });
                    })}
                  </div> */}
                </Row>

                <Row style={{ width: "100%" }}>
                  <Box style={{ width: "100%" }}>
                    <Center>
                      <Textarea
                        placeholder="Create a new post!"
                        backgroundColor="white"
                        onChange={handlePostChange}
                        m={2}
                        value={postText}
                        resize="none"
                      />
                    </Center>

                    <Flex>
                      {postAlertMessage}
                      <Spacer />
                      <Button colorScheme="teal" onClick={handlePostClick}>
                        Post
                      </Button>
                    </Flex>
                  </Box>
                </Row>
              </Container>
            </div>
          </Col>

          <Col>
            <div id="postPanel" className={styles.postPanel}>
              <Container>
                <Row>
                  <Center h="8vh" w="100%">
                    <Text fontSize="3xl" fontWeight="bold" color="teal.900">
                      Grocery List
                    </Text>
                  </Center>
                </Row>
                <Row>
                  <div
                    id="makeShiftLine"
                    className={styles.makeShiftLine}
                  ></div>
                </Row>
                <Row>
                  {renderGrocery()}
                  {/* <div id="postCards" className={styles.postCards}>
                    {dummyData.map((data) => {
                      return Feature({
                        text: data.text,
                        author: data.author,
                      });
                    })}
                  </div> */}
                </Row>

                <Row style={{ width: "100%" }}>
                  <Box style={{ width: "100%" }}>
                    <Center>
                      <Textarea
                        placeholder="Add an item to the grocery list!"
                        backgroundColor="white"
                        onChange={handleGroceryChange}
                        m={2}
                        resize="none"
                        value={groceryText}
                      />
                    </Center>
                    <Flex>
                      {groceryAlertMessage}
                      <Spacer />
                      <Button
                        colorScheme="teal"
                        onClick={handleGroceryItemClick}
                      >
                        Add
                      </Button>
                    </Flex>
                  </Box>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
