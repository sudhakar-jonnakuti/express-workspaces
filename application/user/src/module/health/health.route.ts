import { Router } from "express";

import { HealthCheckController } from "./health.controller";

class HealthCheckRoute {
  path = "/health";
  router = Router();
  controller: HealthCheckController;

  constructor() {
    this.controller = new HealthCheckController();
    this.router.get(this.path, this.controller.getHealth);
  }
}

export { HealthCheckRoute };
