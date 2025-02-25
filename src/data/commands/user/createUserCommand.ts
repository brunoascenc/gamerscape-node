export type CreateUserCommand = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type LoginUserCommand = {
  email: string;
  password: string;
}