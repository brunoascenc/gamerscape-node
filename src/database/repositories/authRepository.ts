import { CreateUserCommand } from "../../data/commands/auth/authCommand";
import { UserResponse } from "../../data/responses/auth";
import AppDataSource from "../config/dataSource";
import { User } from "../entities/user";

export class AuthRepository {
  static repo = AppDataSource.getRepository(User);

  static async create(command: CreateUserCommand): Promise<UserResponse> {
    const item = this.repo.create(command);

    return item;
  }

  static async getAllItems(): Promise<UserResponse[]> {
    const users = await this.repo.find();

    return users;
  }

  static async findItemById(id: string): Promise<UserResponse | undefined> {
    const item = await this.repo.findOne({
      where: {
        id,
      },
    });

    return item;
  }

  static async findItemByUsername(
    username: string
  ): Promise<UserResponse | undefined> {
    const item = await this.repo.findOne({
      where: {
        username: username,
      },
    });

    return item;
  }

  static async findItemByEmail(
    email: string
  ): Promise<UserResponse | undefined> {
    const item = await this.repo.findOne({
      where: {
        email,
      },
    });

    return item;
  }

  static async saveItem(data: UserResponse): Promise<void> {
    await this.repo.save(data);
  }

  static async deleteItem(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
