import { Request, Response } from "express";
import { CreateBackLogService } from "../services/backlogService";

export class CreateBackLogController {
  async handle(request: Request, response: Response) {
    try {
      const service = new CreateBackLogService();
      const { title, externalId } = request.body;

      const result = await service.execute({
        title,
        externalId,
      });

      return response.json(result);
    } catch (error) {
      response.status(400).json(error.message);
    }
  }
}
