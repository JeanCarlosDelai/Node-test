import { NOT_FOUND } from "../consts/ErrorConsts";

export class NotFoundError extends Error {
  statusCode: number;
  msg: string[];
  error: string;
  
  constructor(message: string[]) {
    super(null);
    this.statusCode = 404;
    this.msg = message;
    this.error = NOT_FOUND;
  }
}