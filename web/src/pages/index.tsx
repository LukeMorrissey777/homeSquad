import { Box } from "@chakra-ui/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { HomeBody } from "../components/HomeBody";
import { HomeHeader } from "../components/HomeHeader";
import { NavBar } from "../components/NavBar";
import { HomeQuery, useHomeQuery } from "../generated/graphql";

const Index = () => {
  const [homeId, setHomeId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [{ data: homeData, fetching: homeFetching }] = useHomeQuery({
    variables: { id: homeId ?? -1 },
  });

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"
        />
      </Head>
      <Box minH="100vh" backgroundColor="teal.100">
        <Box position="sticky" top="0">
          <NavBar setHomeId={setHomeId} setUserId={setUserId} />
          <HomeHeader
            homeId={homeId}
            userId={userId}
            homeData={homeData}
            homeFetching={homeFetching}
          />
        </Box>
        <HomeBody
          homeId={homeId}
          userId={userId}
          homeData={homeData}
          homeFetching={homeFetching}
        />
      </Box>
    </>
  );
};

export default Index;
