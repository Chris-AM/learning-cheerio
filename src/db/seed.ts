import "dotenv/config";
import axios from "axios";
import cheerio from "cheerio";
import conManager from "./ormconfig";
import { getConnection, getRepository } from "typeorm";
import { CharacterEntity } from "../entity/characterEntity";

conManager();

const getCharacterPagesNames = async () => {
  const url =
    "https://throneofglass.fandom.com/wiki/Category:Kingdom_of_Ash_characters";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const categories = $("ul.category-page__members-for-char");
  const characterPagesNames = [];
  for (let i = 0; i < categories.length; i++) {
    const ul = categories[i];
    const charactersList = $(ul).find("li.category-page__member");
    for (let j = 0; j < charactersList.length; j++) {
      const li = charactersList[j];
      const path =
        $(li).find("a.category-page__member-link").attr("href") || "";
      const name = path.replace("/wiki/", "");
      characterPagesNames.push(name);
    }
  }
  return characterPagesNames;
};

const getCharacterInfo = async (characterName: string) => {
  const url = "https://throneofglass.fandom.com/wiki/" + characterName;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  let name = $('h2[data-source="name"]').text();
  let species = $(
    'div[data-source="species"] > div.pi-data-value.pi-font'
  ).text();
  let image = $(".image.image-thumbnail > img").attr("src");
  if (!name) {
    name = characterName.replace("_", "");
  }
  const characterInfo = {
    name,
    species,
    image,
  };
  return characterInfo;
};

const loadCharacters = async () => {
  const characterPageNames = await getCharacterPagesNames();
  const characterInfoPromises = characterPageNames.map((characterName) =>
    getCharacterInfo(characterName)
  );
  const characters = await Promise.all(characterInfoPromises);
  const charactersEntities = characters.map((character) => {
    const characterEntity = new CharacterEntity();
    characterEntity.name = character.name;
    characterEntity.species = character.species;
    characterEntity.image = character.image || '';
    return characterEntity;
  });

  const connection = getConnection();
  const repository = connection.getRepository(CharacterEntity).create(charactersEntities);
  const charactersSaved = await getRepository(CharacterEntity).save(repository);
  
};

//getCharacterPagesNames();
loadCharacters();
