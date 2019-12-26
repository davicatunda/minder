import type { Node } from 'react';

import React from 'react';

type Props = {
  children: Node,
  onClick(): void,
  onMouseDown(): void,
};

function ButtonIcon(props: Props): Node {
  return (
    <button
      {...props}
      style={{
        background: "none",
        border: 0,
        padding: 0,
        margin: 0,
        cursor: "pointer",
      }}
    />
  );
}

export default ButtonIcon;