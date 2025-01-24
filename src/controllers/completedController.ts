import { Request, response, Response } from "express";
import { CreateGamesService, DeleteCompletedService, GetAllCompletedService, GetCompletedByIdService } from "../services/completedService";

export class CreateCompletedController {
   async handle(request: Request, response: Response) {
    try {
      const service = new CreateGamesService();
      const {
        title,
        externalId,
        psCompletionism,
        steamCompletionism,
        xboxCompletionism,
      } = request.body;

      const result = await service.execute({
        title,
        externalId,
        psCompletionism,
        steamCompletionism,
        xboxCompletionism,
      });

      return response.json(result);
    } catch (error) {
      response.status(400).json(error.message);
    }
  }
}

export class GettAllCompletedController{
  async handle(request: Request, response: Response) {
    const service = new GetAllCompletedService();

    const completed = await service.execute();

    return response.json(completed);
  }
}

export class DeleteCompletedController{
  async handle(request: Request, response: Response) {
    const service = new DeleteCompletedService();
 
    const result = await service.execute(request.params.id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}

export class GetCompletedByIdController {
  async handle(request: Request, response: Response) {
    const service = new GetCompletedByIdService();

    const result = await service.execute(request.params.id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    } 

    return response.json(result);
  }
}