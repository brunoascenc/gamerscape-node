import { CreateCompletedCommand, UpdateCompletedCommand } from "../../data/commands/completed/completedCommand";
import { CompletedResponse } from "../../data/responses/completed";
import AppDataSource from "../config/dataSource";
import { Completed } from "../entities/completed";

export class CompletedRepository {
  static repo = AppDataSource.getRepository(Completed);

  static async create(
    command: CreateCompletedCommand
  ): Promise<CompletedResponse> {
    const item = this.repo.create({ ...command, user: { id: command.userId } });

    return item;
  }

  static async getAllItems(): Promise<CompletedResponse[]> {
    const completed = await this.repo.find();

    return completed;
  }

  static async findItemById(
    id: string
  ): Promise<CompletedResponse | undefined> {
    const item = await this.repo.findOne({
      where: {
        id,
      },
    });

    return item;
  }

  static async findItemByTitle(
    title: string
  ): Promise<CompletedResponse | undefined> {
    const item = await this.repo.findOne({
      where: {
        title,
      },
    });

    return item;
  }

  static async saveItem(data: CompletedResponse): Promise<void> {
    this.repo.save(data);
  }

  static async deleteItem(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
