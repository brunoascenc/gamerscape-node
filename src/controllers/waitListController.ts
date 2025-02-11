import { Request, Response } from "express";
import { CreateWaitListService, DeleteWaitListService, GetAllWaitListService, GetWaitListByIdService } from "../services/waitListService";

export class CreateWaitListController {
  async handle(request: Request, response: Response) {
    try {
      const service = new CreateWaitListService();
      const { title, externalId, userId } = request.body;

      const result = await service.execute({
        title,
        externalId,
        userId
      });

      return response.json(result);
    } catch (error) {
      response.status(400).json(error.message);
    }
  }
}

export class GetAllWaitListController{
  async handle(request: Request, response: Response) {
    const service = new GetAllWaitListService();

    const waitList = await service.execute();

    return response.json(waitList);
  }
}

export class DeleteWaitListController{
  async handle(request: Request, response: Response) {
    const service = new DeleteWaitListService();
 
    const result = await service.execute(request.params.id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}

export class GetWaitListByIdController {
  async handle(request: Request, response: Response) {
    const service = new GetWaitListByIdService();

    const result = await service.execute(request.params.id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    } 

    return response.json(result);
  }
}