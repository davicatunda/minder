import type { Node } from 'react';

import React from 'react';

type Props = {
  onAddItem(): void,
};

function AddListRowItem(props: Props): Node {
  return (
    <button onClick={props.onAddItem}> + </button>
  );
}

export default AddListRowItem;