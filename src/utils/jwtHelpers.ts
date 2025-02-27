import jwt from "jsonwebtoken";

export const jwtTokens = ({
  userId,
  username,
  email,
}: {
  userId: string;
  username: string;
  email: string;
}): {
  accessToken: string;
  refreshToken: string;
} => {
  const user = { userId, username, email };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });

  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return { accessToken, refreshToken };
};