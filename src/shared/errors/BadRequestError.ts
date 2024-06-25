import { BAD_REQUEST } from "../consts/ErrorConsts";

export class BadRequestError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.error = BAD_REQUEST;
  }
}
