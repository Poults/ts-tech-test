import { StatusCodes } from "#node_modules/http-status-codes/build/cjs";
import { dalCreateUser, UserType } from "#src/domain/dal/user";
import { createUser, CreateUserResponse } from "./create-user";

vi.mock("#src/domain/dal/user");
const dalCreateUserMock = vi.mocked(dalCreateUser);

describe("create-user.ts", () => {
  beforeEach(() => {
    dalCreateUserMock.mockReset();
  });

  const validRequestBody = {
    fullName: "Kanye Test",
    password: "Hunter12",
    emailAddress: "kanye.test@securepass.co.uk",
    createdDate: "2025-04-21T19:54:12",
    userType: UserType.Parent,
  };

  it(`When given a valid request should return ${StatusCodes.OK} and the user id`, async () => {
    const mockUserId = "mock-user-id";
    dalCreateUserMock.mockResolvedValue(mockUserId);
    const actual = await createUser(validRequestBody);

    const expected: CreateUserResponse = {
      statusCode: StatusCodes.OK,
      payload: { message: `Created new user`, userId: mockUserId },
    };

    expect(dalCreateUserMock).toBeCalledTimes(1);
    expect(actual).toEqual(expected);
  });

  describe("has an invalid password", () => {
    const testcases = [
      {
        password: "Short",
        errorMessage: "password must be atleast 8 characters",
      },
      {
        password:
          "ThisPasswordIsWayToLongItsOverSixtyFourCharactersWhichFailsChecks",
        errorMessage: "password mmust be shorter than 64 characters",
      },
      {
        password: "ALLUPPERCASE",
        errorMessage: "password must contain at least one lowercase character",
      },
      {
        password: "alllowercase",
        errorMessage: "password must contain at least one uppercase character",
      },
    ];

    it.each(testcases)(
      `$password  should return ${StatusCodes.BAD_REQUEST}`,
      async ({ password, errorMessage }) => {
        const requestBody = {
          ...validRequestBody,
          password,
        };
        const actual = await createUser(requestBody);

        console.log(actual);

        const expected: CreateUserResponse = {
          statusCode: StatusCodes.BAD_REQUEST,
          payload: { message: JSON.stringify({ password: [errorMessage] }) },
        };

        expect(actual).toEqual(expected);
        expect(dalCreateUserMock).toBeCalledTimes(0);
      },
    );
  });
});
