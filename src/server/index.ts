import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/user", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/user/:id", (req: Request, res: Response) => {
  console.log("request params", req.params);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
