import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

interface CustomRequest extends Request {
  user: jwt.JwtPayload;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.status(401).send();

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (
      err: jwt.VerifyErrors | null,
      user: jwt.JwtPayload | string | undefined
    ) => {
      if (err) return res.status(403).send();
      (req as CustomRequest).user = user as jwt.JwtPayload;
      next();
    }
  );
};
