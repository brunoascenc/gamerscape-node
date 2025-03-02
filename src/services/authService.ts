import {
  CreateUserCommand,
  LoginUserCommand,
} from "../data/commands/auth/authCommand";
import { User } from "../database/entities/user";
import { AuthRepository } from "../database/repositories/authRepository";
import bcrypt from "bcrypt";
import { ServiceException } from "../utils/handleRequest";
import { jwtTokens } from "../utils/jwtHelpers";
import { Response, Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { JwtUser } from "../data/commands/auth/authDto";
import axios from "axios";
import { twitchTokenUrl } from "../utils/api";
import {
  LoginAuthResponse,
  RefreshAuthResponse,
  TwitchAuthTokensResponse,
  UserResponse,
} from "../data/responses/auth";

export class CreateUserService {
  async execute(command: CreateUserCommand): Promise<UserResponse | Error> {
    const userExists = await AuthRepository.findItemByUsername(
      command.username
    );
    const hashedPassword = await bcrypt.hash(command.password, 10);

    if (userExists) {
      return new Error("Nome de usuário indisponível");
    }

    const user = await AuthRepository.create({
      ...command,
      password: hashedPassword,
    });

    await AuthRepository.repo.save(user);

    return user;
  }
}

export class GetAllUserService {
  async execute(): Promise<UserResponse[]> {
    const users = await AuthRepository.getAllItems();

    return users;
  }
}

export class LoginUserService {
  async execute(
    command: LoginUserCommand,
    response: Response
  ): Promise<LoginAuthResponse> {
    const user = await AuthRepository.findItemByEmail(command.email);

    if (!user) {
      throw new ServiceException("E-mail não encontrado", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      command.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ServiceException("Senha incorreta", 401);
    }

    const igdbToken: TwitchAuthTokensResponse = await axios.post(
      twitchTokenUrl,
      null,
      {
        params: {
          client_id: process.env.IGDB_CLIENT_ID,
          client_secret: process.env.IGDB_CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      }
    );

    let tokens = jwtTokens({
      userId: user.id,
      username: user.username,
      email: user.email,
    });

    response.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return {
      ...tokens,
      igdbAccessToken: igdbToken.data.access_token,
      igdbExpiresIn: igdbToken.data.expires_in,
      igdbTokenType: igdbToken.data.token_type,
    };
  }
}

export class RefreshTokenService {
  async execute(
    request: Request,
    response: Response
  ): Promise<RefreshAuthResponse> {
    const refreshToken = request.cookies.refreshToken as string;

    if (!refreshToken) {
      throw new ServiceException(
        "Você não possui um token de atualização",
        401
      );
    }

    return new Promise<RefreshAuthResponse>((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: VerifyErrors | null, user: JwtUser | string | undefined) => {
          if (err) {
            reject(new ServiceException("O seu token não é valido", 403));
          }

          if (!user) {
            reject(
              new ServiceException("O seu token não cont m informa es", 403)
            );
          }

          const tokens = jwtTokens(user as JwtUser);

          response.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });

          resolve(tokens);
        }
      );
    });
  }
}

export class DeleteRefreshTokenService {
  async execute(request: Request, response: Response): Promise<void> {
    const refreshToken = request.cookies.refreshToken as string;

    if (!refreshToken) {
      throw new ServiceException(
        "Você não possui um token de atualização",
        401
      );
    }

    response.clearCookie("refreshToken");
  }
}
