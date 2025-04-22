import { StatusCodes } from "#node_modules/http-status-codes/build/cjs";
import { CreateUserPayload } from "#src/adapters/http/create-user";
import { UserType } from "#src/domain/dal/user";
import request from "supertest";

describe("get-user.int.test.ts", () => {
  it(`given an unrecognized user, returns ${StatusCodes.NOT_FOUND}`, async () => {
    const userId = "1234";
    const response = await request("http://localhost:3000", {})
      .get(`/user/${userId}`)
      .set("User-Agent", "ts-tech-test-int-test");

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);

    expect(response.error).toBeTruthy();
    //replicate line above, but ensures the type marshalling kicks in
    if (response.error) {
      expect(response.error.text).toBe(
        `Unable to locate a user with id ${userId}`,
      );
    }
  });

  it(`given an user id that correlates to a user, returns ${StatusCodes.OK} and the user in the payload`, async () => {
    //I would usually create this entity directly into the database, however how we're running int tests is a bottleneck to that solution.
    const creationDate = "2025-04-21T19:54:12.000Z";
    const expectedUser = {
      fullName: "Kanye Test",
      password: "Hunter12",
      emailAddress: "kanye.test@securepass.co.uk",
      createdDate: new Date(creationDate),
      userType: UserType.Parent,
    };

    const createResponse = await request("http://localhost:3000", {})
      .post(`/user/`)
      .set("User-Agent", "ts-tech-test-int-test")
      .send(expectedUser);

    expect(createResponse.statusCode).toBe(StatusCodes.OK);
    const parsedCreateRespsonse: CreateUserPayload = JSON.parse(
      createResponse.text,
    );

    const userId = parsedCreateRespsonse.userId;

    console.log("userId", userId);

    const response = await request("http://localhost:3000", {})
      .get(`/user/${userId}`)
      .set("User-Agent", "ts-tech-test-int-test");

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body).toEqual({
      emailAddress: expectedUser.emailAddress,
      fullName: expectedUser.fullName,
      userType: expectedUser.userType,
      createdDate: creationDate,
      identifier: userId,
    });
  });
});
