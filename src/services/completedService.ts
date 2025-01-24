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

export class GetAllCompletedService {
  async execute() {
    const repo = AppDataSource.getRepository(Completed);

    const completed = await repo.find();

    return completed;
  }
}

export class DeleteCompletedService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(Completed);
    console.log(id)
    const completed = await repo.findOne({
      where: {
        id: id,
      },
    });
    if (!completed) {
      return new Error("O jogo não foi encontrado");
    }
    
    console.log(id)
    await repo.delete(id);
  }
}
