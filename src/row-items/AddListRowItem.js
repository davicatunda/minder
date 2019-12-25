import type { Node } from 'react';

import React from 'react';
import AddIcon from '../icons/AddIcon';

type Props = {
  onAddItem(): void,
};

function AddListRowItem(props: Props): Node {
  return (
    <button
      onClick={props.onAddItem}
      style={{
        background: "none",
        border: 0,
        padding: 0,
        margin: 0,
        cursor: "pointer",
      }}
    >
      <AddIcon size={20} />
    </button>
  );
}

export default AddListRowItem;