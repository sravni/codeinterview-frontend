import { NetworkError } from "./NetworkError";

export class ForbiddenError extends NetworkError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}
