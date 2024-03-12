import { PokemonClient } from 'pokenode-ts';
import {  useState } from 'react';
import { getTidyPokemon } from './helpers';
import useQueryParams from './useQueryParams';

const useFetch = () => {
  const { getQueryParam } = useQueryParams();
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  
  const api = new PokemonClient();

  const getPokemonList = async (offset:number, limit:number) => {
    setIsLoading(true)
    const searchName = getQueryParam("name");
    if (searchName) {
      const searchedResult = await pokemonByName(searchName);
      setIsLoading(false)
      setTotalItems(1)
      setTotalPages(2) // because we round it up when we get the totalItems
      return [getTidyPokemon(searchedResult)]
    }
    const result = await api.listPokemons(offset, limit).then(async (data) => {
      setTotalItems(data?.count || 0)
      const totalPages = data.count ? Math.ceil(data.count / limit) : 0
      setTotalPages(totalPages)
      const results = data.results.map(async (pokemon) => {
        const pokemonData = await pokemonByName(pokemon.name);
        const tidyPokemon = getTidyPokemon(pokemonData)
        return tidyPokemon
      })
      return Promise.all(results)
    })

    setIsLoading(false)
    return result
  }

  const pokemonByName = async (name: string) => {
    setIsLoading(true)
    const pokemon = await api.getPokemonByName(name)
    setIsLoading(false)
    return pokemon
  }

  const getPokemonTypes = async () => {
    const types = await api.listTypes()
    return types.results
  }

  return { isLoading, totalPages, totalItems, getPokemonList, pokemonByName, getPokemonTypes };
}

export default useFetch;