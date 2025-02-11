import { Request, Response } from "express";
import { sendSuccessResponse, sendErrorResponse } from "./responseHandler";

const statusNumber = {
  PATCH: 200,
  PUT: 200,
  POST: 201,
  DELETE: 204,
  GET: 200,
};

export const handleRequest = async (
  request: Request,
  response: Response,
  serviceFunction: Function
) => {
  try {
    const result = await serviceFunction(request.body);
    return sendSuccessResponse(response, result, statusNumber[request.method]);
  } catch (error) {
    return sendErrorResponse(response, error.message, 400);
  }
};
