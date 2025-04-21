import { dalGetUser, User, UserType } from "#src/domain/dal/user";
import {
  getUser,
  GetUserFailureResponse,
  GetUserRequest,
  GetUserSuccessResponse,
} from "./get-user";

vi.mock("#src/domain/dal/user");
const dalGetUserMock = vi.mocked(dalGetUser);

describe("get-user.ts", () => {
  beforeEach(() => {
    dalGetUserMock.mockReset();
  });

  const validRequestBody: GetUserRequest = {
    userId: "1asd2f34-1fasd32-12das3452",
  };

  //This usecase shouldn't actually happen, as a path param needs to be specified
  it("When given an invalid request should return Bad Request (400)", async () => {
    const actual = await getUser({ invalidRequest: "yup" });

    const expected: GetUserFailureResponse = {
      statusCode: 400,
      payload: JSON.stringify({ userId: ["Required"] }),
    };

    expect(dalGetUserMock).toBeCalledTimes(0);
    expect(actual).toEqual(expected);
  });

  it("When given an valid request for an unknown user, return Not Found (404)", async () => {
    const mockUser = undefined;

    dalGetUserMock.mockResolvedValue(mockUser);
    const actual = await getUser(validRequestBody);

    const expected: GetUserFailureResponse = {
      statusCode: 404,
      payload: `Unable to locate a user with id ${validRequestBody.userId}`,
    };

    expect(dalGetUserMock).toBeCalledTimes(1);
    expect(actual).toEqual(expected);
  });

  it("When given a valid request should return true", async () => {
    const mockUser: User = {
      identifier: validRequestBody.userId,
      fullName: "Kanye Test",
      password: "TopSecretPassword",
      emailAddress: "kanye.test@securepass.co.uk",
      createdDate: new Date("2025-04-21T17:11:35.013Z"),
      userType: UserType.Parent,
    };

    dalGetUserMock.mockResolvedValue(mockUser);
    const actual = await getUser(validRequestBody);

    const expected: GetUserSuccessResponse = {
      statusCode: 200,
      payload: {
        identifier: mockUser.identifier,
        fullName: mockUser.fullName,
        emailAddress: mockUser.emailAddress,
        createdDate: mockUser.createdDate,
        userType: mockUser.userType,
      },
    };

    expect(dalGetUserMock).toBeCalledTimes(1);
    expect(actual).toEqual(expected);
  });
});
