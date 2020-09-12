import { DynamoDB } from 'aws-sdk';
import { ITodo, DynamoOperations } from './types';
import { v4 } from 'uuid';

const documentClient = new DynamoDB.DocumentClient();

export const Dynamo: DynamoOperations = {
  async get(id: string, TableName: string) {
    if (!id) {
      throw new Error('Please provide an ID');
    }
    const params = {
      TableName,
      Key: {
        ID: id,
      },
    };
    const data = await documentClient.get(params).promise();
    if (!data || !data.Item) {
      throw new Error('Could not find todo');
    }
    return data.Item;
  },
  async getAll(TableName: string) {
    const params = {
      TableName,
    };
    const data = await documentClient.scan(params).promise();
    if (!data || !data.Items) {
      throw new Error('Could not fetch any data');
    }
    return data.Items;
  },

  async write(todo: Pick<ITodo, 'title' | 'description'>, TableName: string) {
    const newTodo = {
      ...todo,
      ID: v4(),
      todoStatus: false,
    };
    const params = {
      TableName,
      Item: newTodo,
    };
    const res = await documentClient.put(params).promise();
    if (!res) {
      throw new Error('Error inserting new todo');
    }
    const data = await documentClient.scan(params).promise();
    if (!data || !data.Items) {
      throw new Error('Could not fetch any data');
    }
    return data.Items;
  },

  async update(id: string, todoStatus: { [key: string]: boolean }, TableName) {
    const { value } = todoStatus;
    const params = {
      TableName,
      UpdateExpression: `set todoStatus = :todoStatus`,
      ExpressionAttributeValues: {
        ':todoStatus': value,
      },
      Key: {
        ID: id,
      },
    };

    const findParams = {
      TableName,
      Key: {
        ID: id,
      },
    };

    const updatedTodo = await documentClient.update(params).promise();
    if (!updatedTodo) {
      throw new Error('Could not update todo');
    }
    const newData = await documentClient.scan(findParams).promise();
    if (!newData || !newData.Items) {
      throw new Error('Could not fetch any data');
    }
    return newData.Items;
  },

  async delete(id: string, TableName: string) {
    const params = {
      TableName,
      Key: {
        ID: id,
      },
    };
    const data = await documentClient.get(params).promise();
    if (!data) {
      throw new Error(`Could not find todo with ID ${id}`);
    }
    const res = await documentClient.delete(params).promise();
    if (!res) {
      throw new Error('Could not delete todo');
    }

    const newData = await documentClient.scan(params).promise();
    if (!newData || !newData.Items) {
      throw new Error('Could not fetch any data');
    }
    return newData.Items;
  },
};
