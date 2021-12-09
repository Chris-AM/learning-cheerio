import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CharacterEntity } from "../entity/characterEntity";

const getCharacters = async (req: Request, res: Response): Promise<Response> => {
  try {
    const characters = await getRepository(CharacterEntity).find();
    return res.json({
      message: "getCharacters",
      characters,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error. Check the logs.",
    });
    console.log(error);
    throw (error);
  }
};

const getCharacterById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const character = await getRepository(CharacterEntity).findOne(id);
    return res.json({
      message: "getCharacter",
      character,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error. Check the logs.",
    });
    console.log(error);
    throw (error);
  }
};

const createCharacter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newCharacter = await getRepository(CharacterEntity).create(req.body);
    const createdCharacter = await getRepository(CharacterEntity).save(newCharacter);
    return res.json({
      message: "createCharacter",
      createdCharacter,
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error. Check the logs.",
    });
    console.log(error);
    throw (error);
  }
};

const updateCharacter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const character = await getRepository(CharacterEntity).findOne(id);
    if (!character) {
      return res.status(404).json({
        ok: false,
        message: "Character not found.",
      });
    }else{
      getRepository(CharacterEntity).merge(character, req.body);
      const updatedCharacter = await getRepository(CharacterEntity).save(character);
      return res.json({
        message: "updateCharacter",
        updatedCharacter,
      });
    }
} catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error. Check the logs.",
    });
    console.log(error);
    throw (error);
  }
};

const deleteCharacter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const character = await getRepository(CharacterEntity).findOne(id);
    if (!character) {
      return res.status(404).json({
        ok: false,
        message: "Character not found.",
      });
    }else{
      await getRepository(CharacterEntity).delete(id);
      return res.json({
        message: "deleteCharacter",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error. Check the logs.",
    });
    console.log(error);
    throw (error);
  }
};

export { getCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter };
