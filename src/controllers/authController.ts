import { Request, Response } from "express";
import {
  CreateUserService,
  DeleteRefreshTokenService,
  GetAllUserService,
  LoginUserService,
  RefreshTokenService,
  RefreshTwitchTokenService,
} from "../services/authService";
import { handleRequest } from "../utils/handleRequest";
import {
  CreateUserCommand,
  LoginUserCommand,
} from "../data/commands/auth/authCommand";

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
    });
  }
}

export class LoginUserController {
  async handle(request: Request, response: Response) {
    return handleRequest(
      request,
      response,
      async (body: LoginUserCommand) => {
        const service = new LoginUserService();
        return await service.execute(body, response);
      },
      200
    );
  }
}

export class GetRefreshTokenController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new RefreshTokenService();
      return await service.execute(request, response);
    });
  }
}

export class DeleteRefreshTokenController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new DeleteRefreshTokenService();
      return await service.execute(request, response);
    });
  }
}

export class GetRefreshTwitchTokenController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new RefreshTwitchTokenService();
      return await service.execute(request, response);
    });
  }
}
