export type CreateCompletedCommand = {
  title: string;
  externalId: string;
  psCompletionism: boolean;
  steamCompletionism: boolean;
  xboxCompletionism: boolean;
};

export type UpdateCompletedCommand = {
  id: string;
  title: string;
  psCompletionism: boolean;
  steamCompletionism: boolean;
  xboxCompletionism: boolean;
}