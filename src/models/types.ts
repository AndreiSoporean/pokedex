export type CustomPokemon = {
  id: number;
  name: string;
  abilities: string[];
  image: string | null;
  types: string[];
}

export type SelectOption = {
  name: string;
  url: string;
};

export type FilterType = {
  [key: string]: string 
};