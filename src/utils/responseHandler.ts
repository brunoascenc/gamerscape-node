import { Response } from "express";
import { ErrorResponse, SuccessResponse } from "../data/responses/genericResponse";

export const sendSuccessResponse = <T>(
  response: Response,
  data: T,
  statusCode = 200
): Response<SuccessResponse<T>> => {
  return response.status(statusCode).json({
    success: true,
    data,
  });
};

export const sendErrorResponse = (
  response: Response,
  message: string,
  statusCode = 400
): Response<ErrorResponse> => {
  return response.status(statusCode).json({
    success: false,
    message,
  });
};
