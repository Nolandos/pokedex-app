import { API_URL } from "../config";

export const createPokemonImageAndGetId = async (pokemons, url) => {
  let imageUrl = "";

  const result = await pokemons.map(pokemon => {
    let pokemonId = pokemon.url.split(`${API_URL}/pokemon/`)[1];
    pokemonId = parseInt(pokemonId.substring(0, pokemonId.length - 1));

    if (pokemonId < 10) imageUrl = `${url}detail/00${pokemonId}.png`;
    if (pokemonId >= 10 && pokemonId < 100) {
      imageUrl = `${url}detail/0${pokemonId}.png`;
    }
    if (pokemonId >= 100) imageUrl = `${url}detail/${pokemonId}.png`;

    return { ...pokemon, imageUrl, id: pokemonId };
  });
  return result;
};
