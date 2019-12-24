import type { Node } from 'react';

import React from 'react';

type Props = {
  onAddItem(): void,
};

function AddListRowItem(props: Props): Node {
  return (
    <li><button onClick={props.onAddItem}> + </button></li>
  );
}

export default AddListRowItem;