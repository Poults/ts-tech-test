import * as sqlite3 from "sqlite3";
import { User } from "./user";

export class SingletonDatabaseClient {
  static #instance: SingletonDatabaseClient;
  public database: sqlite3.Database;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static get instance(): SingletonDatabaseClient {
    if (!SingletonDatabaseClient.#instance) {
      SingletonDatabaseClient.#instance = new SingletonDatabaseClient();
    }

    this.database = new sqlite3.Database(":memory:");

    this.database.serialize(() => {
      this.database.run(`CREATE TABLE "users" (
    [identifier] NVARCHAR PRIMARY KEY NOT NULL,
    [fullName] NVARCHAR  NOT NULL,
    [password] NVARCHAR  NOT NULL,
    [emailAddress] NVARCHAR  NOT NULL,
    [createdDate] DATETIME  NOT NULL,
    [userType] NVARCHAR  NOT NULL
);`);
    });

    return SingletonDatabaseClient.#instance;
  }
}
