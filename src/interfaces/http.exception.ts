import {StatusCodes} from 'http-status-codes';

export class HttpException extends Error {
  public message: string;
  public status: number;
  public errors: string | string[] | undefined;

  constructor(
    status: number | StatusCodes,
    message: string,
    errors?: string | string[],
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}
