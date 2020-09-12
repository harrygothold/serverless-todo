import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Dynamo } from '../common/Dynamo';
import { apiResponses } from '../common/constants';
import { ITodo } from '../common/types';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const todo: ITodo = JSON.parse(event.body);
  if (!todo.description || !todo.title) {
    return apiResponses._400({ message: 'One or more fields are missing' });
  }
  const newTodo = await Dynamo.write(todo, 'todo').catch((err) => {
    console.error('Error adding todo', err);
    return null;
  });
  if (!newTodo) {
    return apiResponses._400({ message: 'Could not write new todo' });
  }
  return apiResponses._200({ newTodo, message: 'New todo added successfully' });
};
