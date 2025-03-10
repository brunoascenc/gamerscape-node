export type PopScoreBaseResponse = {
  data: {
    game_id: number;
  }[];
};

export type BaseGamesResponse = {
  id: number;
  name: string;
  cover: {
    id: number;
    image_id: string;
  };
};
