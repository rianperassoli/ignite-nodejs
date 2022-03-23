import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/user";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
