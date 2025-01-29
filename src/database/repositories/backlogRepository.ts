import AppDataSource from "../config/dataSource";
import { Backlog } from "../entities/backlog";

export class BacklogRepository {
  static repo = AppDataSource.getRepository(Backlog);

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

  static async findItemByTitle(title: string) {
    const item = await this.repo.findOne({
      where: {
        title: title,
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
