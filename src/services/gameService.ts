import axios from "axios";
import { TwitchAuthTokensResponse } from "../data/responses/auth";
import { idgbApiUrl, twitchTokenUrl } from "../utils/api";
import { ServiceException } from "../utils/handleRequest";
import { Request, Response } from "express";
import { PopScoreBaseResponse, BaseGamesResponse } from "../data/responses/game";

const getTwitchAcessToken = async (): Promise<TwitchAuthTokensResponse> => {
  try {
    const igdbToken = await axios.post(twitchTokenUrl, null, {
      params: {
        client_id: process.env.IGDB_CLIENT_ID,
        client_secret: process.env.IGDB_CLIENT_SECRET,
        grant_type: "client_credentials",
      },
    });

    return igdbToken.data;
  } catch (error) {
    throw new ServiceException(
      "Não foi possível obter o token de acesso do IGDB",
      401
    );
  }
};

export class GetTwitchTokenService {
  async execute(): Promise<TwitchAuthTokensResponse> {
    const igdbToken = await getTwitchAcessToken();

    return igdbToken;
  }
}

export class RefreshTwitchTokenService {
  async execute(
    request: Request,
    response: Response
  ): Promise<TwitchAuthTokensResponse> {
    const igdbToken = await getTwitchAcessToken();

    return igdbToken;
  }
}

export class GetPopularGamesService {
  async execute(accessToken: string): Promise<BaseGamesResponse[]> {
    const headers = {
      headers: {
        "Client-Id": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const { data } : PopScoreBaseResponse = await axios.post(
      `${idgbApiUrl}/popularity_primitives`,
      `
        fields game_id;
        sort value desc;
        limit 10;
        where popularity_type = 3;
      `,
      headers
    );

    const gameIds = data.map((game) => game.game_id).join(",");

    const games = await axios.post(
      `${idgbApiUrl}/games`,
      `
        fields name, cover.image_id, game_status;
        where id = (${gameIds});
        limit 10;
      `,
      headers
    );

    return games.data;
  }
}


export class GetAnticipatedGamesService {
  async execute(accessToken: string): Promise<BaseGamesResponse[]> {
    const headers = {
      headers: {
        "Client-Id": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const nowTimestamp = Math.floor(Date.now() / 1000);

    const games = await axios.post(
      `${idgbApiUrl}/games`,
      `
        fields name, cover.image_id, game_status, hypes, first_release_date;
        sort hypes desc;
        where first_release_date > ${nowTimestamp};
        limit 20;
      `,
      headers
    );
    
    return games.data;
  }
}

export class GetComingSoonGamesService {
  async execute(accessToken: string): Promise<BaseGamesResponse[]> {
    const headers = {
      headers: {
        "Client-Id": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const nowTimestamp = Math.floor(Date.now() / 1000);
    const threeMonthsLater = nowTimestamp + 60 * 60 * 24 * 90;

    const games = await axios.post(
      `${idgbApiUrl}/games`,
      `
        fields name, cover.image_id, game_status, first_release_date;
        where first_release_date > ${nowTimestamp} & first_release_date < ${threeMonthsLater};
        sort first_release_date asc;
        limit 20;
      `,
      headers
    );
    
    return games.data;
  }
}