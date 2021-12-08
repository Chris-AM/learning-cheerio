import { Request, Response } from "express";

const getCharacters = (req: Request, res: Response) => {
  try {
    res.json({
      message: "getCharacters",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error. Check the logs.",
    });
    console.log(error);
  }
};

const getCharacterById = (req: Request, res: Response) => {
    try {
        res.json({
            message: "getCharacterById",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Internal server error. Check the logs.",
        });
        console.log(error);
    }
};

export { getCharacters, getCharacterById };