import { NOT_FOUND } from "../consts/ErrorConsts";

export class NotFoundError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.error = NOT_FOUND;
  }
}