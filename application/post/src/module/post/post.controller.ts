import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";

import { InternalServeError } from "@express-workspaces/error";
import { SuccessOk } from "@express-workspaces/response";
import { Request, Response } from "express";
import * as path from "path";

class PostController {
  postDatabaseURI = path.join(
    path.basename(__dirname),
    "../dist/cjs/database/post.database.json"
  );

  getPosts = async (request: Request, response: Response) => {
    try {
      const postDatabaseContent = await fs.readFile(
        this.postDatabaseURI,
        "utf-8"
      );
      const postDatabase = postDatabaseContent
        ? JSON.parse(postDatabaseContent)
        : {};
      const postData = postDatabase ? Object.values(postDatabase) : [];

      SuccessOk(response, postData);
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };

  getPostById = async (request: Request, response: Response) => {
    const id: string = request.params?.id;

    try {
      const postDatabaseContent = await fs.readFile(
        this.postDatabaseURI,
        "utf-8"
      );
      const postDatabase = postDatabaseContent
        ? JSON.parse(postDatabaseContent)
        : {};
      const postDataById: any = postDatabase[id] ? postDatabase[id] : {};

      SuccessOk(response, postDataById);
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };

  createPost = async (request: Request, response: Response) => {
    const id = randomUUID();
    const { title, userId, author, content } = request.body;
    const post = { id, userId, title, author, content };

    try {
      const postDatabaseContent = await fs.readFile(
        this.postDatabaseURI,
        "utf-8"
      );
      const postDatabase = postDatabaseContent
        ? JSON.parse(postDatabaseContent)
        : {};
      postDatabase[id] = post;
      const updatedPostDatabase = JSON.stringify(postDatabase, null, 2);
      await fs.writeFile(this.postDatabaseURI, updatedPostDatabase, "utf-8");
      SuccessOk(response, {
        success: true,
        msg: `The post with the id "${id}" was created`
      });
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };

  updatePost = async (request: Request, response: Response) => {
    let postResponse: any;
    const id: any = request.params?.id;
    const userId: string = request.query?.userId as string;
    const { title, author, content } = request.body;

    try {
      const postDatabaseContent: any = await fs.readFile(
        this.postDatabaseURI,
        "utf-8"
      );
      const postDatabase = postDatabaseContent
        ? JSON.parse(postDatabaseContent)
        : {};

      if (postDatabase[id] && postDatabase[id].userId) {
        postDatabase[id] = { id, userId, title, author, content } as any;
        const updatedPostDatabase = JSON.stringify(postDatabase, null, 2);
        postResponse = {
          success: true,
          msg: `The post with the id "${id}" was updated`
        };
        await fs.writeFile(this.postDatabaseURI, updatedPostDatabase, "utf-8");
      } else {
        postResponse = {
          success: false,
          msg: `The post with the id/userId "${id}"/"${userId}" was not found`
        };
      }

      SuccessOk(response, postResponse);
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };

  deletePost = async (request: Request, response: Response) => {
    let postResponse: any;
    const id: any = request.params?.id;
    const userId: string = request.query?.userId as string;

    try {
      const postDatabaseContent: any = await fs.readFile(
        this.postDatabaseURI,
        "utf-8"
      );
      const postDatabase = postDatabaseContent
        ? JSON.parse(postDatabaseContent)
        : {};

      if (postDatabase[id] && postDatabase[id].userId) {
        delete postDatabase[id];
        const updatedPostDatabase = JSON.stringify(postDatabase, null, 2);
        postResponse = {
          success: true,
          msg: `The post with the id "${id}" was deleted`
        };
        await fs.writeFile(this.postDatabaseURI, updatedPostDatabase, "utf-8");
      } else {
        postResponse = {
          success: false,
          msg: `The post with the id/userId "${id}"/"${userId}" was not found`
        };
      }

      SuccessOk(response, postResponse);
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };
}

export { PostController };
