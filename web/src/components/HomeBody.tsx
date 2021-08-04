import { Button, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Spacer, Text, Heading } from "@chakra-ui/layout";
import { SP } from "next/dist/next-server/lib/utils";
import { stringify } from "querystring";
import React, { useState } from "react";
import { useMeQuery, useHomeQuery, HomeQuery } from "../generated/graphql";
import { MinusHomeModal } from "./MinusHomeModal";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../style/homeBody.module.css";
import { Textarea } from "@chakra-ui/textarea";

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
          return Feature({
            text: item.item,
            author: item.author?.username ?? "",
          });
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
          return Feature({
            text: post.text,
            author: post.author?.username ?? "",
          });
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
                        onChange={(e) => console.log}
                        m={2}
                        resize="none"
                      />
                    </Center>
                    <Flex>
                      <Spacer />
                      <Button colorScheme="teal">Post</Button>
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

                <Row style={{ width: "100%", height: "100vh" }}>
                  <Box style={{ width: "100%", height: "100%" }}>
                    <Center>
                      <Textarea
                        placeholder="Add an item to the grocery list!"
                        backgroundColor="white"
                        onChange={(e) => console.log}
                        m={2}
                        resize="none"
                      />
                    </Center>
                    <Flex>
                      <Spacer />
                      <Button colorScheme="teal">Add</Button>
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
