import { Request, Response } from "express";
import {
  CreateBackLogService,
  DeleteBacklogService,
  GetAllBacklogService,
} from "../services/backlogService";
import { GetCompletedByIdService } from "../services/completedService";
import { CreateBacklogCommand } from "../data/commands/backlog/backlogCommand";
import { handleRequest } from "../utils/handleRequest";

export class CreateBackLogController {
  async handle(request: Request, response: Response) {
    return handleRequest(
      request,
      response,
      async (body: CreateBacklogCommand) => {
        const service = new CreateBackLogService();
        return await service.execute(body);
      }
    );
  }
}

export class GetAllBacklogController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetAllBacklogService();
      return await service.execute();
    });
  }
}

export class DeleteBacklogController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new DeleteBacklogService();
      return await service.execute(request.params.id);
    });
  }
}

export class GetBacklogByIdController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetCompletedByIdService();
      return await service.execute(request.params.id);
    });
  }
}
