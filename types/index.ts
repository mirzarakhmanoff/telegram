export interface IUser {
  email: string;
  _id: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
}

export interface ChildProps {
  children: React.ReactNode;
}

export interface IError {
  response: { data: { message: string } };
}
