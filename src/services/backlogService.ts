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

export class GetAllBacklogService {
  async execute() {
    const repo = AppDataSource.getRepository(Backlog);

    const backlog = await repo.find();

    return backlog;
  }
}

export class DeleteBacklogService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(Backlog);

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

export class GetBacklogByIdService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(Backlog);

    const response = await repo.findOne({
      where: {
        id: id,
      },
    });

    if (!response) {
      return new Error("O jogo não foi encontrado");
    }
    
    return response
  }
}