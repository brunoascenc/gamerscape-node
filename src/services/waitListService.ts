import { CreateWaitListCommand } from "../data/commands/waitList/waitListCommand";
import { BaseItemResponse } from "../data/responses/genericResponse";
import { WaitListRepository } from "../database/repositories/waitListRepository";

export class CreateWaitListService {
  async execute(command: CreateWaitListCommand): Promise<BaseItemResponse | Error> {
    const itemExists = await WaitListRepository.findItemByTitle(command.title);

    if (itemExists) {
      return new Error("O jogo já existe nessa lista");
    }

    const game = await WaitListRepository.create(command);

    await WaitListRepository.repo.save(game);

    return game;
  }
}

export class GetAllWaitListService {
  async execute(): Promise<BaseItemResponse[]> {
    const waitListItems = await WaitListRepository.getAllItems();

    return waitListItems;
  }
}

export class DeleteWaitListService {
  async execute(id: string): Promise<Error | undefined> {
    const itemExists = await WaitListRepository.findItemById(id);

    if (!itemExists) {
      return new Error("O jogo não foi encontrado");
    }

    await WaitListRepository.deleteItem(id);
  }
}

export class GetWaitListByIdService {
  async execute(id: string): Promise<BaseItemResponse | Error> {
    const waitListItem = await WaitListRepository.findItemById(id);

    if (!waitListItem) {
      return new Error("O jogo não foi encontrado");
    }

    return waitListItem;
  }
}
