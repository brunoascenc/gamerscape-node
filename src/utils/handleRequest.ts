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

export const handleRequest = async (
  request: Request,
  response: Response,
  serviceFunction: Function,
  successStatusCode?: number
) => {
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

    return sendErrorResponse(response, error.message, 400);
  }
};

export class ServiceException extends Error {
  statusCode: number;

  constructor(message: string, statusCode: errorCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
