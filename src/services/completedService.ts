import AppDataSource from "../database/config/dataSource";
import { CreateCompletedCommand, UpdateCompletedCommand } from "../data/commands/completed/completedCommand";
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

    const completed = await repo.findOne({
      where: {
        id: id,
      },
    });
    if (!completed) {
      return new Error("O jogo não foi encontrado");
    }
    

    await repo.delete(id);
  }
}

export class GetCompletedByIdService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(Completed);

    const completed = await repo.findOne({
      where: {
        id: id,
      },
    });

    if (!completed) {
      return new Error("O jogo não foi encontrado");
    }
    
    return completed
  }
}

export class UpdateCompletedService {
  async execute({
    id,
    title,
    psCompletionism,
    steamCompletionism,
    xboxCompletionism,
  }: UpdateCompletedCommand): Promise<Completed | Error> {
    const repo = AppDataSource.getRepository(Completed);

    const game = await repo.findOne({
      where: {
        id: id,
      },
    })

    if (!game) {
      return new Error("O jogo não foi encontrado.");
    }

    game.title = title ? title : game.title
    game.xboxCompletionism = title ? xboxCompletionism : game.xboxCompletionism
    game.steamCompletionism = title ? steamCompletionism : game.steamCompletionism
    game.psCompletionism = title ? psCompletionism : game.psCompletionism

    await repo.save(game);

    return game;
  }
}
