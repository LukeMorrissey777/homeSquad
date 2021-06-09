import { stringify } from "querystring";
import React from "react";
import { useMeQuery, useHomeQuery } from "../generated/graphql";

interface HomeBodyProps {
  homeId: number | null;
}

export const HomeBody: React.FC<HomeBodyProps> = ({ homeId }) => {
  // const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (!homeId) {
    body = (
      <>
        <div>Please choose a home to view</div>
      </>
    );
  } else {
    const [{ data: homeData, fetching: homeFetching }] = useHomeQuery({
      variables: { id: homeId },
    });
    if (homeFetching) {
      body = <div>... Loading</div>;
    } else if (!homeData?.home) {
      body = <div>No home</div>;
    } else {
      body = (
        <div>
          {homeData.home.name} owned by {homeData.home.owner?.username}
        </div>
      );
    }
    // body = <div>saw</div>;
  }

  // if (fetching) {
  // } else if (!data?.me) {
  //   body = (
  //     <>
  //       <div>Not logged in</div>
  //     </>
  //   );
  // } else if (!data.me.homes) {
  //   body = (
  //     <>
  //       <div>No homes yet</div>
  //     </>
  //   );
  // } else {
  //   body = (
  //     <>
  //       {data.me.homes.map((home) => {
  //         return <div>{home.name}</div>;
  //       })}
  //     </>
  //   );
  // }
  return (
    <div>
      {/* <div>{homeId}</div> */}
      <div>{body}</div>
    </div>
  );
};
