export type SuccessResponse<T> = {
  success: boolean;
  data: T;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
};
