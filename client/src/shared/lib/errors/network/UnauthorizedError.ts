import { NetworkError } from "./NetworkError";

export class UnauthorizedError extends NetworkError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}
