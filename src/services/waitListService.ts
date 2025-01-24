import AppDataSource from "../database/config/dataSource";
import { CreateWaitListCommand } from "../data/commands/waitList/waitListCommand";
import { WaitList } from "../database/entities/waitList";

export class CreateWaitListService {
  async execute({
    title,
    externalId,
  }: CreateWaitListCommand): Promise<WaitList | Error> {
    const repo = AppDataSource.getRepository(WaitList);

    if (
      await repo.findOne({
        where: {
          title: title,
        },
      })
    ) {
      return new Error("O jogo já existe nessa lista");
    }

    const game = repo.create({
      title,
      externalId,
    });

    await repo.save(game);

    return game;
  }
}

export class GetAllWaitListService {
  async execute() {
    const repo = AppDataSource.getRepository(WaitList);

    const waitList = await repo.find();

    return waitList;
  }
}

export class DeleteWaitListService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(WaitList);

    const item = await repo.findOne({
      where: {
        id: id,
      },
    });
  
    if (!item) {
      return new Error("O jogo não foi encontrado");
    }

    await repo.delete(id);
  }
}