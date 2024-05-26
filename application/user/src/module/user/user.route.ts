import { Router } from "express";

import { UserController } from "./user.controller";

class UserRoute {
  path = "/v1/user";
  router = Router();
  controller: UserController;

  constructor() {
    this.controller = new UserController();
    this.initRoute();
  }

  initRoute(): void {
    this.router.post(this.path, this.controller.createUser);
    this.router.get(this.path, this.controller.getUser);
    this.router.get(`${this.path}/:id`, this.controller.getUserById);
    this.router.patch(`${this.path}/:id`, this.controller.updateUser);
    this.router.delete(`${this.path}/:id`, this.controller.deleteUser);
  }
}

export { UserRoute };
