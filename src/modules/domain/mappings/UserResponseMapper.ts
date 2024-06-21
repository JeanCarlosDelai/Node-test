import { UserRespondeDTO } from "../dtos/UserReponse.dto";
import { IUser } from "../interfaces/User.interface";

export default class UserResponseMapper {
  static response = (data: IUser): UserRespondeDTO => {
    return new UserRespondeDTO(data.id, data.name, data.email);
  };
}