import { Request, Response } from "express";
import { handleRequest } from "../utils/handleRequest";
import { GetAnticipatedGamesService, GetComingSoonGamesService, GetPopularGamesService } from "../services/gameService";

export class GetPopularGamesController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetPopularGamesService();
      return await service.execute(request.params.accessToken);
    });
  }
}

export class GetAnticipatedGamesController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetAnticipatedGamesService();
      return await service.execute(request.params.accessToken);
    });
  }
}

export class GetComingSoonGamesController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetComingSoonGamesService();
      return await service.execute(request.params.accessToken);
    });
  }
}
