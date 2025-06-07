import {StatusCodes} from 'http-status-codes';

export class HttpResponse {
  message: string;
  data: any;
  statusCode: number;

  constructor(message: string, data: any, statusCode = StatusCodes.OK) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
