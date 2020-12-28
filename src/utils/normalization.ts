import { v4 as uuid } from "uuid";

export type StoreKey = string;
type NodesStore = {
  [key: string]: TNode;
};
export type Store = {
  rootNode: RootNode;
  nodes: NodesStore;
};
export type TNode =
  | TObjectNode
  | TListNode
  | TDateNode
  | TStringNode
  | TBooleanNode
  | TNumberNode
  | TNullNode;

export interface TNodeWithKeys<T extends RefinedType> {
  type: T;
  key: StoreKey;
  parentKey: StoreKey;
}
export type TObjectField = {
  name: string;
  value: StoreKey;
  parentKey: StoreKey;
};
export interface TObjectNode extends TNodeWithKeys<RefinedType.Object> {
  fields: TObjectField[];
}
export interface TListNode extends TNodeWithKeys<RefinedType.List> {
  children: StoreKey[];
}
export interface TDateNode extends TNodeWithKeys<RefinedType.Date> {
  date: Date;
}
export interface TStringNode extends TNodeWithKeys<RefinedType.String> {
  value: string;
}
export interface TBooleanNode extends TNodeWithKeys<RefinedType.Boolean> {
  value: boolean;
}
export interface TNumberNode extends TNodeWithKeys<RefinedType.Number> {
  value: number;
}
export interface TNullNode extends TNodeWithKeys<RefinedType.Null> {}

export enum RefinedType {
  List = "List",
  Object = "Object",
  Number = "Number",
  Boolean = "Boolean",
  String = "String",
  Date = "Date",
  Null = "Null",
}

export type RootNode = {
  title: string;
  encryptionKey: string;
  created: Date;
  updated: Date;
  key: string;
  value: StoreKey;
};

export function normalizeRoot(
  decodedData: string,
  overrides: {
    encryptionKey?: string;
    title?: string;
  },
): Store {
  const parsedDate = JSON.parse(decodedData);
  const {
    title,
    created = new Date(),
    updated = new Date(),
    key,
    encryptionKey,
    ...values
  } = parsedDate;
  const rootKey = key ?? uuid();
  const nodes = {};
  const rootNodeValue = recursivelyAddNodes(nodes, rootKey, values);
  const store: Store = {
    rootNode: {
      title: overrides.title ?? title ?? "Primary",
      encryptionKey: overrides.encryptionKey ?? encryptionKey,
      created: new Date(created),
      updated: new Date(updated),
      key: rootKey,
      value: rootNodeValue.key,
    },
    nodes,
  };
  return store;
}

function recursivelyAddNodes(
  nodes: NodesStore,
  parentKey: StoreKey,
  data: any,
): TNode {
  const node = getNode(nodes, parentKey, data);
  nodes[node.key] = node;
  return node;
}

function getNode(nodes: NodesStore, parentKey: StoreKey, value: any): TNode {
  const key = uuid();
  if (value instanceof Array) {
    const childrenNodes = value.map((child: any) =>
      recursivelyAddNodes(nodes, parentKey, child),
    );
    const children = childrenNodes.map((node) => node.key);
    return { type: RefinedType.List, key, parentKey, children };
  }
  switch (typeof value) {
    case "string": {
      if (isDate(value)) {
        const date = new Date(value);
        return { type: RefinedType.Date, key, parentKey, date };
      } else {
        return { type: RefinedType.String, key, parentKey, value };
      }
    }
    case "number":
      return { type: RefinedType.Number, key, parentKey, value };
    case "boolean":
      return { type: RefinedType.Boolean, key, parentKey, value };
    case "object":
    default: {
      if (value == null) {
        return { type: RefinedType.Null, key, parentKey };
      } else {
        const fields = Object.keys(value).map((name) => ({
          name,
          value: recursivelyAddNodes(nodes, key, value[name]).key,
          parentKey: key,
        }));
        return { type: RefinedType.Object, key, parentKey, fields };
      }
    }
  }
}

export function denormalizeRoot(store: Store): string {
  return JSON.stringify({
    title: store.rootNode.title,
    created: store.rootNode.created,
    updated: store.rootNode.updated,
    key: store.rootNode.key,
    ...recursivelyDenormalizeNode(store.nodes, store.rootNode.value),
  });
}

export function recursivelyDenormalizeNode(
  nodes: NodesStore,
  nodeKey: StoreKey,
): any {
  const node = nodes[nodeKey];
  switch (node.type) {
    case RefinedType.Boolean:
      return node.value;
    case RefinedType.Date:
      return node.date.toISOString();
    case RefinedType.List:
      return node.children.map((childKey) =>
        recursivelyDenormalizeNode(nodes, childKey),
      );
    case RefinedType.Null:
      return null;
    case RefinedType.Number:
      return node.value;
    case RefinedType.Object:
      const object: { [name: string]: any } = {};
      node.fields.forEach((field) => {
        object[field.name] = recursivelyDenormalizeNode(nodes, field.value);
      });
      return object;
    case RefinedType.String:
      return node.value;
  }
}

export function defaultNodeValue(
  type: RefinedType,
  parentNode: TObjectNode | TListNode,
): TNode {
  const key = uuid();
  const parentKey = parentNode.key;
  switch (type) {
    case RefinedType.List:
      return { type, parentKey, key, children: [] };
    case RefinedType.Boolean:
      return { type, parentKey, key, value: true };
    case RefinedType.Date:
      return { type, parentKey, key, date: new Date() };
    case RefinedType.Null:
      return { type, parentKey, key };
    case RefinedType.Number:
      return { type, parentKey, key, value: 0 };
    case RefinedType.Object:
      return { type, parentKey, key, fields: [] };
    case RefinedType.String:
      return { type, parentKey, key, value: "" };
  }
}

function isDate(value: string): boolean {
  const regex = RegExp(
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
  );
  return regex.test(value);
}
