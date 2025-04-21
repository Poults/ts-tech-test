import { createUser } from "#src/adapters/http/create-user";
import { getUser } from "#src/adapters/http/get-user";
import express, { Express, Request, Response } from "express";

import postmanCollection from "../../api-spec-postman.json";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(postmanCollection);
});

app.post("/user", async (req: Request, res: Response) => {
  const { statusCode, payload } = await createUser(req.body);

  res.status(statusCode).send(payload);
});

app.get("/user/:userId", async (req: Request, res: Response) => {
  const { statusCode, payload } = await getUser(req.params);

  res.status(statusCode).send(payload);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
