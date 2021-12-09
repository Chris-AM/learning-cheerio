import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from "cors";
import morgan from "morgan";

import charactersRouter from "./routes/characters.routes";

const app = express();
createConnection();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(charactersRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

