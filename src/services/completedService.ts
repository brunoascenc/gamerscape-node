import { CreateCompletedCommand, UpdateCompletedCommand } from "../data/commands/completed/completedCommand";
import { Completed } from "../database/entities/completed";
import { CompletedRepository } from "../database/repositories/completedRepository";

export class CreateCompletedService {
  async execute({
    title,
    externalId,
    psCompletionism,
    steamCompletionism,
    xboxCompletionism,
    userId
  }: CreateCompletedCommand): Promise<Completed | Error> {
    const completed = await CompletedRepository.findItemByTitle(title);

    if (completed) {
      return new Error("O jogo já existe nessa lista");
    }

    const game = CompletedRepository.repo.create({
      title,
      externalId,
      psCompletionism,
      steamCompletionism,
      xboxCompletionism,
      user: {
        id: userId
      }
    });

    await CompletedRepository.saveItem(game);

    return game;
  }
}

export class GetAllCompletedService {
  async execute() {
    const completed = await CompletedRepository.getAllItems();

    return completed;
  }
}

export class DeleteCompletedService {
  async execute(id: string) {
    const completed = await CompletedRepository.findItemById(id);

    if (!completed) {
      return new Error("O jogo não foi encontrado");
    }
    
    await CompletedRepository.deleteItem(id);
  }
}

export class GetCompletedByIdService {
  async execute(id: string) {
    const completed = await CompletedRepository.findItemById(id);

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
    const completed = await CompletedRepository.findItemById(id);

    if (!completed) {
      return new Error("O jogo não foi encontrado");
    }

    completed.title = title ? title : completed.title
    completed.xboxCompletionism = xboxCompletionism ? xboxCompletionism : completed.xboxCompletionism
    completed.steamCompletionism = steamCompletionism ? steamCompletionism : completed.steamCompletionism
    completed.psCompletionism = psCompletionism ? psCompletionism : completed.psCompletionism

    await CompletedRepository.saveItem(completed);

    return completed;
  }
}
