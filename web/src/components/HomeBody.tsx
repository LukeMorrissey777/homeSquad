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
    body = (
      <>
        {data.me.homes.map((home) => {
          return <div>{home.name}</div>;
        })}
      </>
    );
  }
  return <div>{body}</div>;
};
