import { NetworkError } from "./NetworkError";

export class NotAllowedError extends NetworkError {
  constructor(message = "Method Not Allowed") {
    super(405, message);
  }
}
