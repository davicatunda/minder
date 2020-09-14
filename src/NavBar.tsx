import React, { CSSProperties, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query NavBarLoggedIn {
    user {
      username
    }
  }
`;

type NavBarLoggedInResponse = {
  user?: {
    username: string;
  };
};
const containerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  background: "#24292e",
  padding: 20,
}
const listStyle: CSSProperties = {
  display: "flex",
  listStyle: "none",
  padding: 0,
  margin: 0,
};
const listItemStyle: CSSProperties = {
  fontWeight: 600,
  color: 'white',
  whiteSpace: 'nowrap',
  marginInlineEnd: 20,
  textDecoration: 'none',
}

const NavBar: FunctionComponent<{}> = () => {
  const { data } = useQuery<NavBarLoggedInResponse>(QUERY);
  return (
    <div style={containerStyle}>
      <ul style={listStyle}>
        <li>
          <Link style={listItemStyle} to="/minder">Home</Link>
        </li>
        <li>
          <Link style={listItemStyle} to="/minder/offline">Offline Mode</Link>
        </li>
        <li>
          <Link style={listItemStyle} to="/minder/standard">Standard</Link>
        </li>
      </ul>
      {data?.user != null && (
        <div style={listItemStyle}>
          {data.user.username}
        </div>
      )}
    </div>
  );
};

export default NavBar;
