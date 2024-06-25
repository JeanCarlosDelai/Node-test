export class UserRespondeDTO {
  readonly id: string;
  readonly name: string;
  readonly email: string;

  constructor(id: string, name: string, email: string) {
    Object.assign(this, { id, name, email });
  }
}