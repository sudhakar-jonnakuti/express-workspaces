import { SuccessOk } from "@express-workspaces/response";
import { Request, Response } from "express";

class HealthCheckController {
  getHealth = (request: Request, response: Response): void => {
    SuccessOk(response, { status: "healthy" });
  };
}

export { HealthCheckController };
