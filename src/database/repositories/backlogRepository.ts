import { CreateBacklogCommand } from "../../data/commands/backlog/backlogCommand";
import { BaseItemResponse } from "../../data/responses/genericResponse";
import AppDataSource from "../config/dataSource";
import { Backlog } from "../entities/backlog";

export class BacklogRepository {
  static repo = AppDataSource.getRepository(Backlog);

  static async createBacklogItem(
    command: CreateBacklogCommand
  ): Promise<BaseItemResponse> {
    const backlogItem = this.repo.create(command);

    return backlogItem;
  }

  static async getAllItems(): Promise<BaseItemResponse[]> {
    const backlogItems = await this.repo.find();

    return backlogItems;
  }

  static async findItemById(id: string): Promise<BaseItemResponse | undefined> {
    const item = await this.repo.findOne({
      where: {
        id,
      },
    });

    return item;
  }

  static async findItemByTitle(
    title: string
  ): Promise<BaseItemResponse | undefined> {
    const item = await this.repo.findOne({
      where: {
        title,
      },
    });

    return item;
  }

  static async saveItem(data: BaseItemResponse): Promise<void> {
    await this.repo.save(data);
  }

  static async deleteItem(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
