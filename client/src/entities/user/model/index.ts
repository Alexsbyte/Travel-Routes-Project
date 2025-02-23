export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData extends ISignInData {
  username: string;
  confirmPassword: string;
  avatar?: File | null;
}

export type UserType = {
  id: number;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWithTokenType = {
  user: UserType;
  accessToken: string;
};



