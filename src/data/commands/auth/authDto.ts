import { JwtPayload } from "jsonwebtoken";

export interface JwtUser extends JwtPayload {
  userId: string;
  username: string;
  email: string;
}