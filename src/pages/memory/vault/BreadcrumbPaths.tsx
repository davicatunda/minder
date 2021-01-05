import { Breadcrumbs, Grow, Link, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";

import { Home } from "@material-ui/icons";
import { HorizontalSpace } from "../../core/Spacing";
import { TObjectField } from "../../../utils/normalization";
import { css } from "@emotion/css";
import { useBreadcrumbsContext } from "./BreadcrumbsProvider";
import useDecodedDataContext from "../useDecodedDataContext";
import { useEditingContext } from "./EditingProvider";

export default function BreadcrumbPaths() {
  const { store } = useDecodedDataContext();
  const { isEditing } = useEditingContext();
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbsContext();
  const goBackToHome = () => {
    setBreadcrumbs([]);
  };
  const goBackToFolder = (objectField: TObjectField) => {
    setBreadcrumbs((old) =>
      old.slice(0, old.findIndex((b) => b.value === objectField.value) + 1),
    );
  };
  if (isEditing) {
    return (
      <Breadcrumbs>
        <BreadcrumbItem>
          <Home />
          <HorizontalSpace s1 />
          {store.rootNode.title}
        </BreadcrumbItem>
      </Breadcrumbs>
    );
  }
  return (
    <Breadcrumbs>
      <BreadcrumbItem onClick={breadcrumbs.length === 0 ? null : goBackToHome}>
        <Home />
        <HorizontalSpace s1 />
        {store.rootNode.title}
      </BreadcrumbItem>
      {breadcrumbs.map((objectField, position, all) => (
        <Grow
          in={true}
          timeout={position * 200}
          style={{ transformOrigin: "0 0 0" }}
          key={objectField.value}
        >
          <BreadcrumbItem
            onClick={
              position < all.length - 1 ? () => goBackToFolder(objectField) : null
            }
          >
            {objectField.name}
          </BreadcrumbItem>
        </Grow>
      ))}
    </Breadcrumbs>
  );
}

type ItemProps = {
  onClick?: (() => void) | null;
  children: ReactNode;
};
function BreadcrumbItem({ onClick, children }: ItemProps) {
  return onClick == null ? (
    <Typography
      color="textPrimary"
      variant="h6"
      className={css({ display: "flex", alignItems: "center" })}
    >
      {children}
    </Typography>
  ) : (
    <Link
      color="inherit"
      variant="h6"
      onClick={onClick}
      className={css({ display: "flex", alignItems: "center", cursor: "pointer" })}
    >
      {children}
    </Link>
  );
}
