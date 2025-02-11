import { CreateWaitListCommand } from "../data/commands/waitList/waitListCommand";
import { WaitList } from "../database/entities/waitList";
import { WaitListRepository } from "../database/repositories/waitListRepository";

export class CreateWaitListService {
  async execute({
    title,
    externalId,
  }: CreateWaitListCommand): Promise<WaitList | Error> {
    const item = await WaitListRepository.findItemByTitle(title);

    if (item) {
      return new Error("O jogo já existe nessa lista");
    }

    const game = WaitListRepository.repo.create({
      title,
      externalId,
    });

    await WaitListRepository.repo.save(game);

    return game;
  }
}

export class GetAllWaitListService {
  async execute() {
    const items = await WaitListRepository.getAllItems();

    return items;
  }
}

export class DeleteWaitListService {
  async execute(id: string) {
    const item = await WaitListRepository.findItemById(id);

    if (!item) {
      return new Error("O jogo não foi encontrado");
    }

    await WaitListRepository.deleteItem(id);
  }
}

export class GetWaitListByIdService {
  async execute(id: string) {
    const item = await WaitListRepository.findItemById(id);

    if (!item) {
      return new Error("O jogo não foi encontrado");
    }

    return item;
  }
}
