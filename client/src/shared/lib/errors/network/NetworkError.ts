export class NetworkError extends Error {
  public status: number;

  constructor(    
    status = 500,
    message = "Something went wrong. Please try again",
  ) {
    super();

    if (Error.captureStackTrace !== undefined) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }

  public toJSON(): { status: number; message: string } {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
