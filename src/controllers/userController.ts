import { Request, Response } from "express";
import { CreateUserService, GetAllUserService } from "../services/userService";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import { handleRequest } from "../utils/handleRequest";
import { CreateUserCommand } from "../data/commands/user/createUserCommand";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async (body: CreateUserCommand) => {
      const service = new CreateUserService();
      return await service.execute(body);
    });
  }
}

export class GetAllUserController {
  async handle(request: Request, response: Response) {
    try {
      const service = new GetAllUserService();

      const result = await service.execute();

      return sendSuccessResponse(response, result, 200);
    } catch (error) {
      return sendErrorResponse(response, error.message, 400);
    }
  }
}
