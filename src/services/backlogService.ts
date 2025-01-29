import AppDataSource from "../database/config/dataSource";
import { Backlog } from "../database/entities/backlog";
import { CreateBacklogCommand } from "../data/commands/backlog/backlogCommand";
import { BacklogRepository } from "../database/repositories/backlogRepository";

export class CreateBackLogService {
  async execute({
    title,
    externalId,
  }: CreateBacklogCommand): Promise<Backlog | Error> {
    const item = BacklogRepository.findItemByTitle(title);

    if (item) {
      return new Error("O jogo já existe nessa lista");
    }

    const game = BacklogRepository.repo.create({
      title,
      externalId,
    });

    await BacklogRepository.repo.save(game);

    return game;
  }
}

export class GetAllBacklogService {
  async execute() {
    const items = BacklogRepository.getAllItems();

    return items;
  }
}

export class DeleteBacklogService {
  async execute(id: string) {
    const item = BacklogRepository.findItemById(id);

    if (!item) {
      return new Error("O jogo não foi encontrado");
    }

    await BacklogRepository.deleteItem(id);
  }
}

export class GetBacklogByIdService {
  async execute(id: string) {
    const item = BacklogRepository.findItemById(id);

    if (!item) {
      return new Error("O jogo não foi encontrado");
    }
    
    return item
  }
}