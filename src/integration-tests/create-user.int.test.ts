import { StatusCodes } from "#node_modules/http-status-codes/build/cjs";
import { CreateUserPayload } from "#src/adapters/http/create-user";
import { UserType } from "#src/domain/dal/user";
import request from "supertest";

describe("user.int.test.ts", () => {
  it(`given a valid create user request, this returns ${StatusCodes.OK} and the user guid`, async () => {
    const response = await request("http://localhost:3000", {})
      .post(`/user/`)
      .set("User-Agent", "ts-tech-test-int-test")
      .send({
        fullName: "Kanye Test",
        password: "Hunter12",
        emailAddress: "kanye.test@securepass.co.uk",
        createdDate: "2025-04-21T19:54:12",
        userType: UserType.Parent,
      });

    const parsedRespsonse: CreateUserPayload = JSON.parse(response.text);

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(parsedRespsonse.message).toEqual("Created new user");
    expect(parsedRespsonse.userId).toEqual(expect.any(String));
  });
});
