import { APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestException } from '../models/exceptions/exceptions';

export function handleError(err: any): APIGatewayProxyResult {
    if (err instanceof BadRequestException) {
      return {
        statusCode: 400,
        body: JSON.stringify(err.name, null, 0),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify('Unexpected Error', null, 0),
      };
    }
  }
