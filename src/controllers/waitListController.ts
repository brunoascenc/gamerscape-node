import { Request, Response } from "express";
import { CreateWaitListCommand } from "../data/commands/waitList/waitListCommand";
import { handleRequest } from "../utils/handleRequest";
import {
  CreateWaitListService,
  DeleteWaitListService,
  GetAllWaitListService,
  GetWaitListByIdService,
} from "../services/waitListService";

export class CreateWaitListController {
  async handle(request: Request, response: Response) {
    return handleRequest(
      request,
      response,
      async (body: CreateWaitListCommand) => {
        const service = new CreateWaitListService();
        return await service.execute(body);
      }
    );
  }
}

export class GetAllWaitListController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetAllWaitListService();
      return await service.execute();
    });
  }
}

export class DeleteWaitListController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new DeleteWaitListService();
      return await service.execute(request.params.id);
    });
  }
}

export class GetWaitListByIdController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetWaitListByIdService();
      return await service.execute(request.params.id);
    });
  }
}
