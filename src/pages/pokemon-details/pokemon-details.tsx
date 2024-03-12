import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router";
import { Pokemon } from "pokenode-ts";

const PokemonDetails = () => {
  const { name } = useParams();
  const { pokemonByName, isLoading } = useFetch()
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (name) {
      getCurrentPokemon(name)
    }
  }, [name])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const getCurrentPokemon = async (name: string) => {
    const pokemon = await pokemonByName(name);
    setSelectedPokemon(pokemon)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 border border-amber-900 rounded-md p-4 gap-2">
      <div className="col-span-1 md:col-span-5 ">
        <p className="uppercase text-amber-800 text-3xl font-bold md:text-4xl">{selectedPokemon?.name}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-6">
          <div className="flex flex-col">
            <p className="uppercase text-sm font-bold">Stats</p>
            <div>
              {selectedPokemon?.stats.map((stat) => (
                <p className="uppercase text-xs text-lime-600" key={stat.stat.name}>{stat.stat.name}: <span className="font-bold">{stat.base_stat}</span></p>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="uppercase text-sm font-bold">abilities</p>
            <div>
              {selectedPokemon?.abilities.map((ability) => (
                <p className="uppercase text-xs text-lime-600" key={ability.ability.name}>{ability.ability.name}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="uppercase text-sm font-bold">types</p>
            <div>
              {selectedPokemon?.types.map((type) => (
                <p className="uppercase text-xs text-lime-600" key={type.type.name}>{type.type.name}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="uppercase text-sm font-bold">items</p>
            <div>
              {selectedPokemon?.held_items.map((item) => (
                <p className="uppercase text-xs text-lime-600" key={item.item.name}>{item.item.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedPokemon?.sprites ? (
        <div className="col-span-1 grid grid-cols-2 border rounded-md border-amber-200 items-center justify-center w-full">
          <img src={selectedPokemon?.sprites.front_default || ''} width={100} height={100} alt={selectedPokemon?.name || 'pokemon'} />
          <img src={selectedPokemon?.sprites.front_shiny || ''} width={100} height={100} alt={selectedPokemon?.name || 'pokemon'} />
          <img src={selectedPokemon?.sprites.back_default || ''} width={100} height={100} alt={selectedPokemon?.name || 'pokemon'} />
          <img src={selectedPokemon?.sprites.back_shiny || ''} width={100} height={100} alt={selectedPokemon?.name || 'pokemon'} />
        </div>

      ) : (<div>No image</div>)}
      <div className="grid col-span-1 md:col-span-5 mt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <p className="uppercase text-amber-800 text-xl font-bold md:text-xl">experience: <span className="text-white">{selectedPokemon?.base_experience}</span> </p>
          <p className="uppercase text-amber-800 text-xl font-bold md:text-xl">weight: <span className="text-white">{selectedPokemon?.weight}</span> </p>
          <p className="uppercase text-amber-800 text-xl font-bold md:text-xl">height: <span className="text-white">{selectedPokemon?.height}</span> </p>
        </div>
      </div>

    </div>
  );
}

export default PokemonDetails;