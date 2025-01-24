import { Request, Response } from "express";
import { CreateGamesService } from "../services/completedService";

export class CreateCompletedController {
   async handle(request: Request, response: Response) {
    try {
      const service = new CreateGamesService();
      const {
        title,
        externalId,
        psCompletionism,
        steamCompletionism,
        xboxCompletionism,
      } = request.body;

      const result = await service.execute({
        title,
        externalId,
        psCompletionism,
        steamCompletionism,
        xboxCompletionism,
      });

      return response.json(result);
    } catch (error) {
      response.status(400).json(error.message);
    }
  }
}
