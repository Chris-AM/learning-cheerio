import {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/characters.controller";

import { Router } from "express";

const charactersRouter = Router();

charactersRouter.get("/characters", getCharacters);
charactersRouter.get("/characters/:id", getCharacterById);
charactersRouter.post("/characters", createCharacter);
charactersRouter.put("/characters/:id", updateCharacter);
charactersRouter.delete("/characters/:id", deleteCharacter);


export default charactersRouter;