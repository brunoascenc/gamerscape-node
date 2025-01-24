import AppDataSource from "../database/config/dataSource";
import { Backlog } from "../database/entities/backlog";
import { CreateBacklogCommand } from "../data/commands/backlog/backlogCommand";

export class CreateBackLogService {
  async execute({
    title,
    externalId,
  }: CreateBacklogCommand): Promise<Backlog | Error> {
    const repo = AppDataSource.getRepository(Backlog);

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
