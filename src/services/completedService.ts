import AppDataSource from "../database/config/dataSource";
import { CreateCompletedCommand } from "../data/commands/completed/completedCommand";
import { Completed } from "../database/entities/completed";

export class CreateGamesService {
  async execute({
    title,
    externalId,
    psCompletionism,
    steamCompletionism,
    xboxCompletionism,
  }: CreateCompletedCommand): Promise<Completed | Error> {
    const repo = AppDataSource.getRepository(Completed);

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
      psCompletionism,
      steamCompletionism,
      xboxCompletionism,
    });

    await repo.save(game);

    return game;
  }
}
