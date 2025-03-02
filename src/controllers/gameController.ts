import { Request, Response } from "express";
import { handleRequest } from "../utils/handleRequest";
import { GetGamesService } from "../services/gameService";

export class GetGamesController {
  async handle(request: Request, response: Response) {
    return handleRequest(request, response, async () => {
      const service = new GetGamesService();
      return await service.execute(request.params.accessToken);
    });
  }
}
