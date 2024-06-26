import { VALITATION } from "../consts/ErrorConsts";
import { HttpStatusCode } from "../enums/HttpStatusCodes";

export class ValidationError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.error = VALITATION;
  }
}