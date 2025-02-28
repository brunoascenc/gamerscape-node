import {
  CreateUserCommand,
  LoginUserCommand,
} from "../data/commands/auth/authCommand";
import { User } from "../database/entities/user";
import { UserRepository } from "../database/repositories/userRepository";
import bcrypt from "bcrypt";
import { ServiceException } from "../utils/handleRequest";
import { jwtTokens } from "../utils/jwtHelpers";
import { Response, Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { JwtUser } from "../data/commands/auth/authDto";

export class CreateUserService {
  async execute(command: CreateUserCommand): Promise<User | Error> {
    const userExists = await UserRepository.findItemByUsername(
      command.username
    );
    const hashedPassword = await bcrypt.hash(command.password, 10);

    if (userExists) {
      return new Error("Nome de usuário indisponível");
    }

    const user = UserRepository.repo.create({
      name: command.name,
      email: command.email,
      username: command.username,
      password: hashedPassword,
    });

    await UserRepository.repo.save(user);

    return user;
  }
}

export class GetAllUserService {
  async execute() {
    const users = UserRepository.getAllItems();

    return users;
  }
}

export class LoginUserService {
  async execute(command: LoginUserCommand, response: Response) {
    const user = await UserRepository.findItemByEmail(command.email);

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

    return tokens;
  }
}

export class RefreshTokenService {
  async execute(request: Request, response: Response) {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      throw new ServiceException(
        "Você não possui um token de atualização",
        401
      );
    }

    return jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err: VerifyErrors | null, user: JwtUser | string | undefined) => {
        if (err) {
          throw new ServiceException("O seu token não é valido", 403);
        }

        const tokens = jwtTokens(user as JwtUser);
        
        response.cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return tokens;
      }
    );
  }
}

export class DeleteRefreshTokenService {
  async execute(request: Request, response: Response) {
    response.clearCookie("refreshToken");
    return;
  }
}
