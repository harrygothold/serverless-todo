import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Dynamo } from '../common/Dynamo';
import { apiResponses } from '../common/constants';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const ID: string | undefined = event?.pathParameters?.ID;
  const value: { [key: string]: boolean } = JSON.parse(event.body);
  if (!ID) {
    return apiResponses._400({ message: 'Please provide a valid ID' });
  }
  const updatedTodo = await Dynamo.update(ID, value, 'todo');
  if (!updatedTodo) {
    return apiResponses._400({
      message: `Could not update todo with ID ${ID}`,
    });
  }
  return apiResponses._200({ updatedTodo });
};
