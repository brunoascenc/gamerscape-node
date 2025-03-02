import { CreateWaitListCommand } from "../../data/commands/waitList/waitListCommand";
import { BaseItemResponse } from "../../data/responses/genericResponse";
import AppDataSource from "../config/dataSource";
import { WaitList } from "../entities/waitList";

export class WaitListRepository {
  static repo = AppDataSource.getRepository(WaitList);

  static async create(
    command: CreateWaitListCommand
  ): Promise<BaseItemResponse> {
    const item = this.repo.create(command);

    return item;
  }

  static async getAllItems(): Promise<BaseItemResponse[]> {
    const waitListItems = await this.repo.find();

    return waitListItems;
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
    this.repo.save(data);
  }

  static async deleteItem(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
