import { useEffect, useState } from "react";
import { HomeBody } from "../components/HomeBody";
import { NavBar } from "../components/NavBar";
import { HomeQuery, useHomeQuery } from "../generated/graphql";

const Index = () => {
  const [homeId, setHomeId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  // const [home, setHome] = useState<HomeQuery | undefined>(undefined);

  // const setHomeWrapper = (id: any) => {
  //   setHomeId(id);
  //   const [{ data: homeData, fetching: homeFetching }] = useHomeQuery({
  //     variables: { id },
  //   });
  //   setHome(homeData);
  // };

  // useEffect(() => {
  //   if (!homeId) {
  //     return;
  //   }
  //   const [{ data: homeData, fetching: homeFetching }] = useHomeQuery({
  //     variables: { id: homeId },
  //   });
  //   setHome(homeData);
  // }, [homeId]);

  return (
    <>
      <NavBar setHomeId={setHomeId} setUserId={setUserId} />
      <HomeBody homeId={homeId} userId={userId} />
    </>
  );
};

export default Index;
