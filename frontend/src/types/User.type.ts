export type UserType = {
  _id?: string | unknown;
  fullName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  token?: string;
};
