import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import HomePageBanner from "./HomePageBanner";
import HomePageProgressCard from "./HomePageProgressCard";
import HomePageUsageCard from "./HomePageUsageCard";
import { VerticalSpace } from "../core/Spacing";
import { createKey } from "../../utils/encryption";
import { css } from "@emotion/css";
import { useHistory } from "react-router-dom";

type HomePageResponse = {
  standardProposal: {
    data: string;
  };
};
const QUERY = gql`
  query HomePage {
    standardProposal {
      data
    }
  }
`;
export default function HomePage() {
  useGithubPagesHasNoRouting();
  const history = useHistory();
  const { data } = useQuery<HomePageResponse>(QUERY);
  function onTryClick() {
    const standardProposal =
      data?.standardProposal?.data ??
      '{"Personal":{},"Community":{},"Education":{},"Work":{},"Health":{}}';
    createKey().then((key) => {
      history.push(
        `minder/memories?title=Demo&key=${key}&data=${standardProposal}&readOnly=false`,
      );
    });
  }

  return (
    <>
      <HomePageBanner onTryClick={onTryClick} />
      <VerticalSpace s16 />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} className={css({ display: "flex" })}>
            <HomePageProgressCard />
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={css({ display: "flex" })}>
            <HomePageUsageCard onTryClick={onTryClick} />
          </Grid>
        </Grid>
      </Container>
      <VerticalSpace s8 />
    </>
  );
}

function useGithubPagesHasNoRouting(): void {
  const history = useHistory();
  useEffect(() => {
    const path = localStorage.getItem("path");
    if (path) {
      localStorage.removeItem("path");
      history.push(path);
    }
  });
}
