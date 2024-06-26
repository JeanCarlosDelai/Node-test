import { VALIDATION } from "../consts/ErrorConsts";
import { HttpStatusCode } from "../enums/HttpStatusCodes";

export class ValidationError {
  statusCode: number;
  message: string[];
  error: string;

  constructor(message: string[]) {
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.message = message;
    this.error = VALIDATION;
  }
}