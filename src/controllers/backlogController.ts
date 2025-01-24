import { Request, Response } from "express";
import { CreateBackLogService, DeleteBacklogService, GetAllBacklogService } from "../services/backlogService";
import { GetCompletedByIdService } from "../services/completedService";

export class CreateBackLogController {
  async handle(request: Request, response: Response) {
    try {
      const service = new CreateBackLogService();
      const { title, externalId } = request.body;

      const result = await service.execute({
        title,
        externalId,
      });

      return response.json(result);
    } catch (error) {
      response.status(400).json(error.message);
    }
  }
}


export class GetAllBacklogController {
  async handle(request: Request, response: Response) {
    const service = new GetAllBacklogService();

    const backlog = await service.execute();

    return response.json(backlog);
  }
}

export class DeleteBacklogController{
  async handle(request: Request, response: Response) {
    const service = new DeleteBacklogService();
 
    const result = await service.execute(request.params.id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}

export class GetBacklogByIdController {
  async handle(request: Request, response: Response) {
    const service = new GetCompletedByIdService();

    const result = await service.execute(request.params.id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    } 

    return response.json(result);
  }
}