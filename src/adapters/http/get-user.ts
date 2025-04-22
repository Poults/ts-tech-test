import { dalGetUser, UserType } from "#src/domain/dal/user";
import * as z from "zod";
import { ApiResponse } from "./types";
import { StatusCodes } from "#node_modules/http-status-codes/build/cjs";

export interface GetUserRequest {
  userId: string;
}

const getUserRequestSchema = z.object({ userId: z.string() });

export type GetUserSuccessResponse = ApiResponse<{
  identifier: string;
  fullName: string;
  emailAddress: string;
  createdDate: Date;
  userType: UserType;
}>;

export type GetUserFailureResponse = ApiResponse<string>;

export const getUser = async (
  requestParams: unknown,
): Promise<GetUserSuccessResponse | GetUserFailureResponse> => {
  try {
    console.debug("request body", requestParams);

    const parsedRequest: GetUserRequest =
      getUserRequestSchema.parse(requestParams);

    console.debug("get user request", parsedRequest);

    const user = await dalGetUser(parsedRequest.userId);

    console.debug("user", user);
    if (!user) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        payload: `Unable to locate a user with id ${parsedRequest.userId}`,
      };
    } else {
      return {
        statusCode: StatusCodes.OK,

        //spreading here would be dangerous as it would also include the password despite not being on the return type
        payload: {
          createdDate: user.createdDate,
          emailAddress: user.emailAddress,
          fullName: user.fullName,
          identifier: user.identifier,
          userType: user.userType,
        },
      };
    }
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
