"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  getPokemonType,
  getPokemons,
  getTypesPokemons,
} from "../services/pokemonApi";
import Pokemon from "./Pokemon";

const PokemonSearchForm = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [types, setTypes] = useState([]);
  const [display, setDisplay] = useState(true);

  const searchTermRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const name = searchTermRef.current.value;

    const type = pokemonList.find((p) => {
      return p.name === name;
    });

    if (type === undefined) {
      setDisplay(false);
      setSearchTerm(undefined);
    } else {
      setDisplay(true);
      setSearchTerm([type]);
    }
  };

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        if (selectedType) {
          const data = await getTypesPokemons(selectedType, types);
          setPokemonList([...data?.pokemon.map((p) => p.pokemon)]);
        } else {
          const data = await getPokemons();
          setPokemonList(data.results);
        }
        const typesOfPoke = await getPokemonType();
        setTypes(typesOfPoke.results);
      } catch (error) {
        console.error("Failed to fetch Pokemon types:", error);
      }
    };

    fetchPokemonTypes();
  }, [selectedType]);

  const renderPokemonList = () => {
    let searchMe = [];
    if (searchTerm) {
      searchMe = searchTerm;
      if (searchMe === undefined) {
        return noPOkimon;
      }
    } else {
      searchMe = pokemonList;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 py-6 w-full">
        {searchMe?.map((pokemon, index) => (
          <Pokemon
            name={pokemon?.name}
            imageURL={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.url
              .split("/")
              .filter((part) => !!part)
              .pop()}.svg`}
            key={index}
          />
        ))}
      </div>
    );
  };

  function noPOkimon() {
    return <>No Pokimon</>;
  }

  return (
    <>
      <div className="p-4">
        <form className="max-w-lg mx-auto my-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="">Select</option>
            {types?.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </form>

        <form onSubmit={handleSearch} className="max-w-lg mx-auto my-3">
          <div className="relative w-full">
            <input
              ref={searchTermRef}
              className="w-full h-10 pl-10 pr-10 rounded-lg text-sm focus:outline-none bg-gray-100 border-gray-100 border-2"
              placeholder="Search..."
            />
            <svg
              className="absolute top-3 left-3 w-4 h-4 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>

            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {display ? renderPokemonList() : noPOkimon()}
    </>
  );
};

export default PokemonSearchForm;
