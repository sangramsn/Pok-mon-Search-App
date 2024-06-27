import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2";

export const getPokemons = async () => {
  try {
    const response = await axios.get(`${baseUrl}/pokemon`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Pokemon types:", error);
    return [];
  }
};

export const getPokemon = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Pokemon types:", error);
    return [];
  }
};

export const getPokemonType = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/type`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Pokemon types:", error);
    return [];
  }
};

export const getTypesPokemons = async (name, types) => {
  try {
    const type = types.find((t) => {
      return t.name === name;
    });

    const response = await axios.get(type.url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Pokemon types:", error);
    return [];
  }
};
