import { Request, Response } from "express";
import { sendSuccessResponse, sendErrorResponse } from "./responseHandler";
import { errorCode } from "../data/responses/genericResponse";

const statusCode = {
  PATCH: 200,
  PUT: 200,
  POST: 201,
  DELETE: 204,
  GET: 200,
};

export const handleRequest = async <T>(
  request: Request,
  response: Response,
  serviceFunction: (body: any) => Promise<T>,
  successStatusCode?: number
): Promise<Response> => {
  try {
    const result = await serviceFunction(request.body);
    return sendSuccessResponse(
      response,
      result,
      successStatusCode || statusCode[request.method]
    );
  } catch (error) {
    if (error instanceof ServiceException) {
      return sendErrorResponse(response, error.message, error.statusCode);
    }

    return sendErrorResponse(
      response,
      (error as any).response?.data?.message || (error as Error).message,
      400
    );
  }
};

export class ServiceException extends Error {
  statusCode: number;

  constructor(message: string, statusCode: errorCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
