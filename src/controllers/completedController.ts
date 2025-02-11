import { Request, response, Response } from "express";
import { CreateCompletedService, DeleteCompletedService, GetAllCompletedService, GetCompletedByIdService, UpdateCompletedService } from "../services/completedService";

export class CreateCompletedController {
   async handle(request: Request, response: Response) {
    try {
      const service = new CreateCompletedService();
      const {
        title,
        externalId,
        psCompletionism,
        steamCompletionism,
        xboxCompletionism,
        userId
      } = request.body;

      const result = await service.execute({
        title,
        externalId,
        psCompletionism,
        steamCompletionism,
        xboxCompletionism,
        userId
      });

      return response.json(result);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}

export class GettAllCompletedController{
  async handle(request: Request, response: Response) {
    const service = new GetAllCompletedService();

    const completed = await service.execute();

    return response.json(completed);
  }
}

export class DeleteCompletedController{
  async handle(request: Request, response: Response) {
    const service = new DeleteCompletedService();
 
    const result = await service.execute(request.params.id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}

export class GetCompletedByIdController {
  async handle(request: Request, response: Response) {
    const service = new GetCompletedByIdService();

    const result = await service.execute(request.params.id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    } 

    return response.json(result);
  }
}

export class UpdateCompletedController {
  async handle(request: Request, response: Response) {
   try {
     const service = new UpdateCompletedService();
     const id = request.params.id;

     const {
       title,
       psCompletionism,
       steamCompletionism,
       xboxCompletionism,
     } = request.body;

     const result = await service.execute({
       id,
       title,
       psCompletionism,
       steamCompletionism,
       xboxCompletionism,
     });

     return response.json(result);
   } catch (error) {
     return response.status(error).json(error.message);
   }
 }
}