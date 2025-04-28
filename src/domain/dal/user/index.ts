import { v4 as uuid } from "uuid";
import * as sqlite3 from "sqlite3";
import { SingletonDatabaseClient } from "../databaseClient";

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
  const db = new sqlite3.Database("./DATABASE");

  const identifier = uuid();

  db.serialize(() => {
    db.run(`INSERT INTO "users"
  VALUES ("1asd2f34-1fasd32-12das3452", "Kanye Test", "TopSecretPassword", "kanye.test@securepass.co.uk", datetime("2025-04-21T17:11:35.013Z"), "Parent");`);

    db.each<User>("SELECT * from users", (err, row) => {
      console.log("row found", row);
    });
  });

  db.close();

  const identifier = uuid();

  users.push({ identifier, ...user });

  return identifier;
};

export const dalGetUser = async (identifier: string) => {
  return users.find((user) => {
    return user.identifier === identifier;
  });
};
