import { API_URL } from "../config";

export const createPokemonImageAndGetId = async (pokemons, url, category) => {
  let imageUrl = "";

  const result = await pokemons.map(pokemon => {
    let pokemonId = pokemon.url.split(`${API_URL}/${category}/`)[1];
    pokemonId = parseInt(pokemonId.substring(0, pokemonId.length - 1));
    imageUrl = `${url}${pokemonId}.png`;

    return { ...pokemon, imageUrl, id: pokemonId };
  });

  return result;
};
