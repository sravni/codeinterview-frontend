import { NetworkError } from "./NetworkError";

export class LockedError extends NetworkError {
  constructor(message = "Locked") {
    super(423, message);
  }
}
