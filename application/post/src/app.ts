import { BadRequest } from "@express-workspaces/error";
import { HandlerException } from "@express-workspaces/exception";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { HealthCheckRoute } from "./module/health/health.route";
import { PostRoute } from "./module/post/post.route";

class App {
  serverPort = Number(process.env.MPOST_PORT);
  app: express.Application;

  constructor() {
    this.app = express();

    this.initMiddlewares();
    this.initRoutes();
    this.initException();
  }

  public initMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public initRoutes() {
    const moduleRoute = () => [new HealthCheckRoute(), new PostRoute()];

    moduleRoute().forEach((appRoute) => {
      this.app.use("/api", appRoute.router);
    });

    this.app.use("*", (request: Request, response: Response) => {
      throw new BadRequest();
    });
  }

  public initException() {
    this.app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        new HandlerException(error, request, response, next);
      }
    );
  }

  public listen() {
    return this.app.listen(Number(this.serverPort), async () => {
      console.log(`App port : ${this.serverPort}`);
      console.log(`App environment : ${process.env.MPOST_ENV}`);
    });
  }
}

export default App;
