import { dalCreateUser } from "#src/domain/dal/user";
import {
  createUser,
  CreateUserRequest,
  createUserResponse,
  UserType,
} from "./create-user";

vi.mock("#src/domain/dal/user");
const dalCreateUserMock = vi.mocked(dalCreateUser);

describe("create-user.ts", () => {
  beforeEach(() => {
    dalCreateUserMock.mockReset();
  });

  const validRequestBody: CreateUserRequest = {
    fullName: "Kanye Test",
    password: "Hunter12",
    emailAddress: "kanye.test@securepass.co.uk",
    createdDate: new Date(),
    userType: UserType.Parent,
  };

  it("When given a valid request should return true", async () => {
    const mockUserId = "mock-user-id";
    dalCreateUserMock.mockResolvedValue(mockUserId);
    const actual = await createUser(validRequestBody);

    const expected: createUserResponse = {
      statusCode: 200,
      payload: `Created User ${mockUserId}`,
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
      "Validate Password $password",
      async ({ password, errorMessage }) => {
        const requestBody: CreateUserRequest = {
          ...validRequestBody,
          password,
        };
        const actual = await createUser(requestBody);

        console.log(actual);

        const expected: createUserResponse = {
          statusCode: 401,
          payload: errorMessage,
        };

        expect(actual).toEqual(expected);
        expect(dalCreateUserMock).toBeCalledTimes(0);
      },
    );
  });
});
