import { CreateCompletedCommand, UpdateCompletedCommand } from "../data/commands/completed/completedCommand";
import { CompletedResponse } from "../data/responses/completed";
import { CompletedRepository } from "../database/repositories/completedRepository";

export class CreateCompletedService {
  async execute(command: CreateCompletedCommand): Promise<CompletedResponse | Error> {
    const itemExists = await CompletedRepository.findItemByTitle(command.title);

    if (itemExists) {
      return new Error("O jogo já existe nessa lista");
    }

    const game = await CompletedRepository.create(command);

    await CompletedRepository.saveItem(game);

    return game;
  }
}

export class GetAllCompletedService {
  async execute(): Promise<CompletedResponse[]> {
    const completed = await CompletedRepository.getAllItems();

    return completed;
  }
}

export class DeleteCompletedService {
  async execute(id: string): Promise<void | Error> {
    const completed = await CompletedRepository.findItemById(id);

    if (!completed) {
      return new Error("O jogo não foi encontrado");
    }

    await CompletedRepository.deleteItem(id);
  }
}

export class GetCompletedByIdService {
  async execute(id: string): Promise<CompletedResponse | Error> {
    const completed: CompletedResponse | undefined = await CompletedRepository.findItemById(id);

    if (!completed) {
      return new Error("O jogo não foi encontrado");
    }
    
    return completed;
  }
}

export class UpdateCompletedService {
  async execute({
    id,
    title,
    psCompletionism,
    steamCompletionism,
    xboxCompletionism,
  }: UpdateCompletedCommand): Promise<CompletedResponse | Error> {
    const completed = await CompletedRepository.findItemById(id);

    if (!completed) {
      return new Error("O jogo não foi encontrado");
    }

    completed.title = title ?? completed.title;
    completed.xboxCompletionism = xboxCompletionism ?? completed.xboxCompletionism;
    completed.steamCompletionism = steamCompletionism ?? completed.steamCompletionism;
    completed.psCompletionism = psCompletionism ?? completed.psCompletionism;

    await CompletedRepository.saveItem(completed);

    return completed;
  }
}
