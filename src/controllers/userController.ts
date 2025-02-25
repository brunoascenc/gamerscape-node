import { Request, Response } from "express";
import { CreateUserService, GetAllUserService, LoginUserService } from "../services/userService";
import { handleRequest } from "../utils/handleRequest";
import { CreateUserCommand, LoginUserCommand } from "../data/commands/user/createUserCommand";

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
    return handleRequest(request, response, async () => {
      const service = new GetAllUserService();
      return await service.execute();
    })
  }
}

export class LoginUserController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async (body: LoginUserCommand) => {
      const service = new LoginUserService();
      return await service.execute(body);
    });
  }
}