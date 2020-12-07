import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

export default function Home() {
  useGithubPagesHasNoRouting();
  return <div>Home</div>;
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
