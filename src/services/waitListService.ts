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
