import { CreateWaitListCommand } from "../data/commands/waitList/waitListCommand";
import { WaitList } from "../database/entities/waitList";
import { WaitListRepository } from "../database/repositories/waitListRepository";

export class CreateWaitListService {
  async execute({
    title,
    externalId,
  }: CreateWaitListCommand): Promise<WaitList | Error> {
    const itemExists = await WaitListRepository.findItemByTitle(title);

    if (itemExists) {
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
    const waitListItems = await WaitListRepository.getAllItems();

    return waitListItems;
  }
}

export class DeleteWaitListService {
  async execute(id: string) {
    const itemExists = await WaitListRepository.findItemById(id);

    if (!itemExists) {
      return new Error("O jogo não foi encontrado");
    }

    await WaitListRepository.deleteItem(id);
  }
}

export class GetWaitListByIdService {
  async execute(id: string) {
    const waitListItem = await WaitListRepository.findItemById(id);

    if (!waitListItem) {
      return new Error("O jogo não foi encontrado");
    }

    return waitListItem;
  }
}
