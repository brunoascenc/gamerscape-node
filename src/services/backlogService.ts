import { CreateBacklogCommand } from "../data/commands/backlog/backlogCommand";
import { BacklogRepository } from "../database/repositories/backlogRepository";
import { BaseItemResponse } from "../data/responses/genericResponse";

export class CreateBackLogService {
  async execute(command: CreateBacklogCommand): Promise<BaseItemResponse | Error> {
    const itemExists = await BacklogRepository.findItemByTitle(command.title);

    if (itemExists) {
      return new Error("O jogo já existe nessa lista");
    }

    const game = await BacklogRepository.createBacklogItem(command);

    await BacklogRepository.repo.save(game);

    return game;
  }
}

export class GetAllBacklogService {
  async execute(): Promise<BaseItemResponse[]> {
    const items = await BacklogRepository.getAllItems();

    return items;
  }
}

export class DeleteBacklogService {
  async execute(id: string): Promise<void | Error> {
    const itemExists = await BacklogRepository.findItemById(id);

    if (!itemExists) {
      return new Error("O jogo não foi encontrado");
    }

    await BacklogRepository.deleteItem(id);
  }
}

export class GetBacklogByIdService {
  async execute(id: string): Promise<BaseItemResponse | Error> {
    const backlogItem = await BacklogRepository.findItemById(id);

    if (!backlogItem) {
      return new Error("O jogo não foi encontrado");
    }

    return backlogItem;
  }
}
