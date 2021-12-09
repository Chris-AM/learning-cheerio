import 'dotenv/config'
import express from "express";
import "reflect-metadata";
import conManager from "./db/ormconfig"; 
import cors from "cors";
import morgan from "morgan";

import charactersRouter from "./routes/characters.routes";


const app = express();
conManager();
const port = process.env.PORT ;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(charactersRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

