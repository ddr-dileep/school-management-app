import express, { Request, Response } from "express";
import { config } from "dotenv";

// env and app configuration
config();
const app = express();
const port: string = process.env.APPLICATION_PROT || "8000";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js + Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
