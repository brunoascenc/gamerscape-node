import AppDataSource from "../config/dataSource";
import { User } from "../entities/user";

export class UserRepository {
  static repo = AppDataSource.getRepository(User);

  static async getAllItems() {
    const completed = await this.repo.find();

    return completed;
  }

  static async findItemById(id: string) {
    const item = await this.repo.findOne({
      where: {
        id: id,
      },
    });

    return item;
  }

  static async findItemByUsername(username: string) {
    const item = await this.repo.findOne({
      where: {
        username: username,
      },
    });

    return item;
  }

  static async findItemByEmail(email: string) {
    const item = await this.repo.findOne({
      where: {
        email: email,
      },
    });

    return item;
  }

  static async saveItem(data: any) {
    await this.repo.save(data);
  }

  static async deleteItem(id: string) {
    await this.repo.delete(id);
  }
}
