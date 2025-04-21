import { v4 as uuid } from "uuid";

const users: User[] = [];

export interface User {
  identifier: string;
  fullName: string;
  password: string;
  emailAddress: string;
  createdDate: Date;
  userType: UserType;
}

export enum UserType {
  "Student" = "Student",
  "Teacher" = "Teacher",
  "Parent" = "Parent",
  "PrivateTutor" = "Private Tutor",
}

export const dalCreateUser = async (user: Omit<User, "identifier">) => {
  const identifier = uuid();

  users.push({ identifier, ...user });

  return identifier;
};
