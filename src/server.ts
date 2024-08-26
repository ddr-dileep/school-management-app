import express from "express";
import { config } from "dotenv";
import rootRouter from "./routers";
import cors from "cors";
import dataBaseConfig from "./configs/dbconfig";

// env and app configuration
config();
dataBaseConfig();
const app = express();
const port: string = process.env.APPLICATION_PROT || "8000";

// middlewares 
app.use(cors());
app.use(express.json());

// API routes setup
app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
