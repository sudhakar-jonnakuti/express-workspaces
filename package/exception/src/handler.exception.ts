import { CustomError, InternalServeError } from "@express-workspaces/error";
import { failureResponse } from "@express-workspaces/response";
import { NextFunction, Request, Response } from "express";

class HandlerException {
  constructor(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (this.isTrustedError(error)) {
      this.trustedError(error as CustomError, response);
    } else {
      this.untrustedError(error, response);
    }
  }

  isTrustedError(error: Error): boolean {
    return error instanceof CustomError;
  }

  normalizeError(error: Error | string | object): Error {
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === "string") {
      return new Error(error);
    }
    return new Error(JSON.stringify(error));
  }

  trustedError(error: CustomError, response: Response): void {
    failureResponse(error, response);
  }

  untrustedError(error: Error, response: Response): void {
    const normalizedError = this.normalizeError(error);
    const serialized = normalizedError.message;
    const internalError = new InternalServeError(serialized);
    failureResponse(internalError as CustomError, response);
  }
}

export { HandlerException };
