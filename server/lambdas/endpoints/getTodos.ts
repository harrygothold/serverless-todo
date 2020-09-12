import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Dynamo } from '../common/Dynamo';
import { apiResponses } from '../common/constants';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const todos = await Dynamo.getAll('todo');
  if (!todos) {
    return apiResponses._400({ message: 'Could not find any todos ' });
  }
  return apiResponses._200({ todos });
};
