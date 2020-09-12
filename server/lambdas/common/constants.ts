export const apiResponses = {
  _200: (body: { [key: string]: any }) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      },
      body: JSON.stringify(body, null, 2),
    };
  },
  _400: (body: { [key: string]: any }) => {
    return {
      statusCode: 400,
      body: JSON.stringify(body, null, 2),
    };
  },
};
