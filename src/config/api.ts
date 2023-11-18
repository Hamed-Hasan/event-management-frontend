export const baseApi =
  (process.env.NEXT_PUBLIC_API_BASE_URL as string) ||
  (process.env.API_BASE_URL as string) ||
  "http://localhost:5000/api/v1";
