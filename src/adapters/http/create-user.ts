import { dalCreateUser, User, UserType } from "#src/domain/dal/user";
import * as z from "zod";
import { ApiResponse } from "./types";
import { StatusCodes } from "http-status-codes";

export type CreateUserRequest = Omit<User, "identifier">;

const postUserRequestSchema = z.object({
  fullName: z.string(),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters" })
    .max(64, { message: "password mmust be shorter than 64 characters" })
    .regex(new RegExp("[A-Z]"), {
      message: "password must contain at least one uppercase character",
    })
    .regex(new RegExp("[a-z]"), {
      message: "password must contain at least one lowercase character",
    }),
  emailAddress: z.string(),
  createdDate: z.string().transform((str) => new Date(str)),
  userType: z.nativeEnum(UserType),
});

export type CreateUserResponse = ApiResponse<string>;

export const createUser = async (
  requestBody: unknown,
): Promise<CreateUserResponse> => {
  try {
    console.debug("request body", requestBody);

    const parsedRequest: CreateUserRequest =
      postUserRequestSchema.parse(requestBody);

    console.debug("new user", parsedRequest);

    const newUserId = await dalCreateUser(parsedRequest);

    return {
      statusCode: StatusCodes.OK,
      payload: `Created User ${newUserId}`,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("create-user.ts encountered a zod error");
      console.debug("zod error message", error.message);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        payload: JSON.stringify(error.flatten().fieldErrors),
      };
    } else {
      console.error("create-user.ts encountered an error");
      console.debug(error);
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        payload: "server error",
      };
    }
  }
};
