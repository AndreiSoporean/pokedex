import { CustomPokemon } from "../../models/types";
import { ChevronRightIcon } from "../icons/icons";

export type ListCardProps = {
  pokemon: CustomPokemon;
  onClick: () => void;
}

const ListCard = ({ pokemon, onClick }: ListCardProps) => {
  return (
    <div onClick={onClick} className="grid grid-cols-1 md:grid-cols-3 w-full border border-amber-900 hover:border-amber-700 cursor-pointer rounded-md my-2 justify-end">
      <div className="flex gap-4 items-center p-4">
        {pokemon.image ? <img className="border rounded-md border-amber-200" src={pokemon.image} width={100} height={100} alt={pokemon.name} /> : <div>No image</div>}
        <p className="capitalize font-bold text-xl text-amber-500">{pokemon.name}</p>
      </div>
      <div className="grid grid-cols-2 justify-start items-start p-4">
        <div className="flex">
          <div className="flex flex-col items-center">
            <p className="uppercase font-bold text-xs">abilities</p>
            {pokemon.abilities.map((ability, index) => (
              <p key={index} className="bg-yellow-950 text-white text-xs rounded-md p-1 my-1">{ability}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="uppercase font-bold text-xs">types</p>
          {pokemon.types.map((type, index) => (
            <p key={index} className="bg-yellow-950 text-white text-xs rounded-md p-1 my-1">{type}</p>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="w-full rounded-br-md rounded-bl-md md:w-[50px] bg-amber-600 h-full flex justify-end items-center md:rounded-tr-md md:rounded-bl-none p-4">
          <div className="w-6"><ChevronRightIcon /></div>
        </div>
      </div>
    </div>
  );
}

export default ListCard;