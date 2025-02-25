import { Request, Response } from "express";
import {
  CreateCompletedService,
  DeleteCompletedService,
  GetAllCompletedService,
  GetCompletedByIdService,
  UpdateCompletedService,
} from "../services/completedService";
import {
  CreateCompletedCommand,
  UpdateCompletedCommand,
} from "../data/commands/completed/completedCommand";
import { handleRequest } from "../utils/handleRequest";

export class CreateCompletedController {
  async handle(request: Request, response: Response) {
    return handleRequest(
      request,
      response,
      async (body: CreateCompletedCommand) => {
        const service = new CreateCompletedService();
        return await service.execute(body);
      }
    );
  }
}

export class GettAllCompletedController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetAllCompletedService();
      return await service.execute();
    });
  }
}

export class DeleteCompletedController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new DeleteCompletedService();
      return await service.execute(request.params.id);
    });
  }
}

export class GetCompletedByIdController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetCompletedByIdService();
      return await service.execute(request.params.id);
    });
  }
}

export class UpdateCompletedController {
  async handle(request: Request, response: Response) {
    return handleRequest(
      request,
      response,
      async (body: UpdateCompletedCommand) => {
        const service = new UpdateCompletedService();
        return await service.execute({ id: request.params.id, ...body });
      }
    );
  }
}
