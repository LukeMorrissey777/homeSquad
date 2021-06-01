import React from "react";
import { useMeQuery } from "../generated/graphql";

interface HomeBodyProps {}

export const HomeBody: React.FC<HomeBodyProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <div>Not logged in</div>
      </>
    );
  } else if (!data.me.homes) {
    body = (
      <>
        <div>No homes yet</div>
      </>
    );
  } else {
    var homeList = "";
    for (var i = 0; i < data.me.homes.length; i++) {
      homeList += (i + 1).toString() + ".   " + data.me.homes[i].name + "\n";
    }
    body = (
      <>
        <div>{homeList}</div>
      </>
    );
  }
  return <div>{body}</div>;
};
