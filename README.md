# express-workspaces

```
Initialize the project
create an empty directory and initialize an NPM package:

npm init -y

Now create the application and packages:

npm init -y --scope @express-workspaces -w application/user

Define the dependencies between the packages:

npm install @express-workspaces/error -w @express-workspaces/user

Here comes TypeScript
Install typescript as a dev dependency in the workspace project:

npm install -D typescript

Every package requires its own tsconfig.json file,
create the tsconfig.json in the root directory.

{
  "files": [],
  "references": [{ "path": "packages/error" }]
}

Empty files array tells to ignore all files except those in the references.
```

```
Build applications:
docker build -t application-user -f docker/application/user/dockerfile .
docker build -t application-post -f docker/application/post/dockerfile .

Up applications:
docker-compose -f docker/application/user/docker-compose.yml up -d
docker-compose -f docker/application/post/docker-compose.yml up -d

Down applications:
docker-compose -f docker/application/user/docker-compose.yml -v --rmi all
docker-compose -f docker/application/post/docker-compose.yml -v --rmi all
```

```
Reference:
Node.js TypeScript monorepo via NPM workspaces
https://daveiscoding.hashnode.dev/nodejs-typescript-monorepo-via-npm-workspaces

How to Set Up a TypeScript Monorepo
https://earthly.dev/blog/setup-typescript-monorepo/#top

```
