import axios from "axios";
import { TwitchAuthTokensResponse } from "../data/responses/auth";
import { twitchTokenUrl } from "../utils/api";
import { ServiceException } from "../utils/handleRequest";
import { Request, Response } from "express";

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

export class GetGamesService {
  async execute(accessToken: string): Promise<any> {
    const games = await axios.post("https://api.igdb.com/v4/games", "fields name, cover.image_id, platforms, game_status ; limit 10;", {
      headers: {
        "Client-Id": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(games)

    return games.data;
  }
}
