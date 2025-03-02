import { BaseItemResponse } from "./genericResponse";

export type CompletedResponse = BaseItemResponse & {
  psCompletionism: boolean;
  steamCompletionism: boolean;
  xboxCompletionism: boolean;
};
