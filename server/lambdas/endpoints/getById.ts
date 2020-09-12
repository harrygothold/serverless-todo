import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Dynamo } from '../common/Dynamo';
import { apiResponses } from '../common/constants';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const ID: string | undefined = event?.pathParameters?.ID;
  if (!ID) {
    return apiResponses._400({ message: 'Please provide a valid ID' });
  }
  const todo = await Dynamo.get(ID, 'todo');
  if (!todo) {
    return apiResponses._400({ message: `Could not find todo with ID ${ID}` });
  }
  return apiResponses._200({ todo });
};
