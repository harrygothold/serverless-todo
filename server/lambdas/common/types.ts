import { AttributeMap, ItemList } from 'aws-sdk/clients/dynamodb';

export interface ITodo {
  ID: string;
  title: string;
  description: string;
  todoStatus: boolean;
}

export interface DynamoOperations {
  get: (id: string, TableName: string) => Promise<AttributeMap>;
  getAll: (TableName: string) => Promise<ItemList>;
  write: (
    todo: Pick<ITodo, 'title' | 'description'>,
    TableName: string
  ) => Promise<ItemList>;
  update: (
    id: string,
    todoStatus: { [key: string]: boolean },
    TableName: string
  ) => Promise<ItemList>;
  delete: (id: string, TableName: string) => Promise<ItemList>;
}
