import { Pokemon } from 'pokenode-ts';

export const getTidyPokemon = (pokemon: Pokemon) => {
  return {
    name: pokemon.name,
    id: pokemon.id,
    abilities: pokemon.abilities.map((ability) => (ability.ability.name)),
    image: pokemon.sprites.front_default,
    types: pokemon.types.map((type) => (type.type.name))
  }
}