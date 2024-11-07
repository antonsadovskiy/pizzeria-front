export type RegisterRequestType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: 'Male' | 'Female';
  birthDate: string;
};

export type RegisterResponseType = {
  access_token: string;
  refresh_token: string;
};

export type LoginRequestType = {
  email: string;
  password: string;
};
export type LoginResponseType = {
  access_token: string;
  refresh_token: string;
};
