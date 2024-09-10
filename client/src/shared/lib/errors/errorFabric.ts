import { NetworkError, UnauthorizedError, ForbiddenError, NotFoundError } from "./network";


export const createNetworkError = (
  status: number,
  params?: {
    message?: string,
  }
): NetworkError => {
  const { message } = params || {};

  switch (status) {
    // case 400:
    //   return new BadRequestError({ message });
    case 401:
      return new UnauthorizedError(message);
    case 403:
      return new ForbiddenError(message);
    case 404:
      return new NotFoundError(message);
    // case 405:
    //   return new NotAllowedError(message);    
    default:
      return new NetworkError(status, message);
  }
};
