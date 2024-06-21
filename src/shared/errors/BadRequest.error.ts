export class BadRequestError extends Error {
  statusCode: number;
  msg: string[];
  error: string;
  
  constructor(message: string[]) {
    super(null);
    this.statusCode = 400;
    this.msg = message;
    this.error = 'Bad Request';
  }
}
