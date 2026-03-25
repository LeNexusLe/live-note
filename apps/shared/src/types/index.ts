// oxlint-disable typescript/ban-types

export type SuccessResponse<T = void> = {
  message: string;
  data?: T;
} & (T extends void ? {} : { data: T });

export type ErrorResponse = {
  error: string;
};
