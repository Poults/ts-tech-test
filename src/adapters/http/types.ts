export interface ApiResponse<T> {
  statusCode: number;
  payload: T;
}
