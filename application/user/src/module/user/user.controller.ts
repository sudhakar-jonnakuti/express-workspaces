import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";

import { InternalServeError } from "@express-workspaces/error";
import { SuccessOk } from "@express-workspaces/response";
import { Request, Response } from "express";
import * as path from "path";

class UserController {
  userDatabaseURI = path.join(
    path.basename(__dirname),
    "../dist/cjs/database/user.database.json"
  );

  getUser = async (request: Request, response: Response) => {
    try {
      const userDatabaseContent = await fs.readFile(
        this.userDatabaseURI,
        "utf-8"
      );
      const userDatabase = userDatabaseContent
        ? JSON.parse(userDatabaseContent)
        : {};
      const userData = userDatabase ? Object.values(userDatabase) : [];

      SuccessOk(response, userData);
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };

  getUserById = async (request: Request, response: Response) => {
    const id: string = request.params?.id;

    try {
      const userDatabaseContent = await fs.readFile(
        this.userDatabaseURI,
        "utf-8"
      );
      const userDatabase = userDatabaseContent
        ? JSON.parse(userDatabaseContent)
        : {};
      const userDataById: any = userDatabase[id] ? userDatabase[id] : {};

      SuccessOk(response, userDataById);
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };

  createUser = async (request: Request, response: Response) => {
    const id = randomUUID();
    const { firstName, lastName, email, msisdn } = request.body;
    const user = { id, firstName, lastName, email, msisdn };

    try {
      const userDatabaseContent = await fs.readFile(
        this.userDatabaseURI,
        "utf-8"
      );
      const userDatabase = userDatabaseContent
        ? JSON.parse(userDatabaseContent)
        : {};
      userDatabase[id] = user;
      const updatedUserDatabase = JSON.stringify(userDatabase, null, 2);
      await fs.writeFile(this.userDatabaseURI, updatedUserDatabase, "utf-8");
      SuccessOk(response, {
        success: true,
        msg: `The user with the id "${id}" was created`
      });
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };

  updateUser = async (request: Request, response: Response) => {
    let userResponse: any;
    const id: any = request.params?.id;
    const { firstName, lastName, email, msisdn } = request.body;

    try {
      const userDatabaseContent: any = await fs.readFile(
        this.userDatabaseURI,
        "utf-8"
      );
      const userDatabase = userDatabaseContent
        ? JSON.parse(userDatabaseContent)
        : {};

      if (userDatabase[id]) {
        userDatabase[id] = { id, firstName, lastName, email, msisdn } as any;
        const updatedUserDatabase = JSON.stringify(userDatabase, null, 2);
        userResponse = {
          success: true,
          msg: `The user with the id "${id}" was updated`
        };
        await fs.writeFile(this.userDatabaseURI, updatedUserDatabase, "utf-8");
      } else {
        userResponse = {
          success: false,
          msg: `The user with the id "${id}" was not found`
        };
      }

      SuccessOk(response, userResponse);
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };

  deleteUser = async (request: Request, response: Response) => {
    let userResponse: any;
    const id: any = request.params?.id;

    try {
      const userDatabaseContent: any = await fs.readFile(
        this.userDatabaseURI,
        "utf-8"
      );
      const userDatabase = userDatabaseContent
        ? JSON.parse(userDatabaseContent)
        : {};

      if (userDatabase[id]) {
        delete userDatabase[id];
        const updatedUserDatabase = JSON.stringify(userDatabase, null, 2);
        userResponse = {
          success: true,
          msg: `The user with the id "${id}" was deleted`
        };
        await fs.writeFile(this.userDatabaseURI, updatedUserDatabase, "utf-8");
      } else {
        userResponse = {
          success: false,
          msg: `The user with the id "${id}" was not found`
        };
      }

      SuccessOk(response, userResponse);
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };
}

export { UserController };
