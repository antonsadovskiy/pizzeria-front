export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  gender: 'Male' | 'Female';
  birthDate: string;
  role: {
    id: number;
    name: string;
  };
};

export type GetUserByIdResponseType = UserType;

export type UpdateUserRequestType = {
  firstname: string;
  lastname: string;
  email: string;
  gender: 'Male' | 'Female';
  birthDate: string;
};
export type UpdateUserResponseType = UserType;

export type GetAllUsersResponseType = UserType[];
