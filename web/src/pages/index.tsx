import { useState } from "react";
import { HomeBody } from "../components/HomeBody";
import { NavBar } from "../components/NavBar";

const Index = () => {
  const [homeId, setHomeId] = useState<number | null>(null);

  return (
    <>
      <NavBar homeId={homeId} setHomeId={setHomeId} />
      <HomeBody homeId={homeId} />
    </>
  );
};

export default Index;
