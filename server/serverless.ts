import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'ts-api',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '1',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    region: 'eu-west-2',
    runtime: 'nodejs12.x',
    profile: 'harry-serverless',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  resources: {
    Resources: {
      MyDynamoDbTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'todo',
          AttributeDefinitions: [
            {
              AttributeName: 'ID',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'ID',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  },
  functions: {
    getAllTodos: {
      handler: 'lambdas/endpoints/getTodos.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'getTodos',
            cors: true,
          },
        },
      ],
    },
    addTodo: {
      handler: 'lambdas/endpoints/addTodo.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'addTodo',
            cors: true,
          },
        },
      ],
    },
    getById: {
      handler: 'lambdas/endpoints/getById.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'getTodo/{ID}',
            cors: true,
          },
        },
      ],
    },
    updateTodo: {
      handler: 'lambdas/endpoints/updateTodo.handler',
      events: [
        {
          http: {
            method: 'put',
            path: 'updateTodo/{ID}',
            cors: true,
          },
        },
      ],
    },
    deleteTodo: {
      handler: 'lambdas/endpoints/deleteTodo.handler',
      events: [
        {
          http: {
            method: 'delete',
            path: 'deleteTodo/{ID}',
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
