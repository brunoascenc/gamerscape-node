import { CreateUserCommand } from "../data/commands/user/createUserCommand";
import { User } from "../database/entities/user";
import { UserRepository } from "../database/repositories/userRepository";
import bcrypt from "bcrypt";

export class CreateUserService {
  async execute(command: CreateUserCommand): Promise<User | Error> {
    const item = await UserRepository.findItemByUsername(command.username);
    const hashedPassword = await bcrypt.hash(command.password, 10);

    if (item) {
      return new Error("Nome de usuário indisponível");
    }

    const user = UserRepository.repo.create({
      name: command.name,
      email: command.email,
      username: command.username,
      password: hashedPassword,
    });


    await UserRepository.repo.save(user);

    return user;
  }
}

export class GetAllUserService {
  async execute() {
    const items = UserRepository.getAllItems();

    return items;
  }
}
