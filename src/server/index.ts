import { createUser } from "#src/adapters/http/create-user";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/user", async (req: Request, res: Response) => {
  const { statusCode, payload } = await createUser(req.body);

  res.status(statusCode).send(payload);
});

app.get("/user/:id", (req: Request, res: Response) => {
  console.log("request params", req.params);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
