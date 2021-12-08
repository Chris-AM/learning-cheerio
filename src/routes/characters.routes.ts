import {
  getCharacters,
  getCharacterById,
} from "../controllers/characters.controller";

import { Router } from "express";

const charactersRouter = Router();

charactersRouter.get("/", getCharacters);
charactersRouter.get("/:id", getCharacterById);

export default charactersRouter;