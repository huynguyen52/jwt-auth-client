export type User = {
  id: string;
  email: string;
  name: string;
  accessToken: string;
};

export type RegisterUser = {
  email: string;
  name: string;
  password: string;
};
