import { NetworkError } from "./NetworkError";

export class NotFoundError extends NetworkError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}
