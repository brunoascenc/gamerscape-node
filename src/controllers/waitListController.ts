import { Request, Response } from "express";
import { CreateWaitListService } from "../services/waitListService";

export class CreateWaitListController {
  async handle(request: Request, response: Response) {
    try {
      const service = new CreateWaitListService();
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
