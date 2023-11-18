export interface IApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: any;
  data: any;
}
