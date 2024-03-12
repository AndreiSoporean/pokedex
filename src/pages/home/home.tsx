import { useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import Pagination from "../../components/pagination/pagination"
import { useEffect, useState } from "react"
import useQueryParams from "../../hooks/useQueryParams"
import ListCard from "../../components/list-card/list-card"
import { CustomPokemon } from "../../models/types"
import FiltersBar from "../../components/filters-bar/filters-bar"

const Home = () => {
  const navigate = useNavigate()

  const { getPokemonList, isLoading, totalPages, totalItems } = useFetch()
  const { getQueryParam, setQueryParams, getQueryParams } = useQueryParams();
  const { limit, page } = getQueryParams();
  const [currentPage, setCurrentPage] = useState(getQueryParam("page") || 1);
  const [data, setData] = useState<CustomPokemon[] | null>(null);
  const itemsLimit = Number(limit) || 10
  const itemsOffset = Number(page) * itemsLimit || 0
  const searchName = getQueryParam("name");
  
  useEffect(() => {
    pokemonList(itemsOffset, itemsLimit)
  }, [itemsLimit, itemsOffset, searchName])

  const pokemonList = async (offset:number, limit:number) => {
    const result = await getPokemonList(offset, limit)
    setData(result)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const onNextPage = () => {
    const next = Number(currentPage) + 1;
    setCurrentPage(next);
    const currentParamsFromUrl = getQueryParams();
    setQueryParams({ ...currentParamsFromUrl, page: `${next}` });
  };

  const onPrevPage = () => {
    const prev = Number(currentPage) - 1;
    setCurrentPage(prev);
    const currentParamsFromUrl = getQueryParams();
    setQueryParams({ ...currentParamsFromUrl, page: `${prev}` });
  };

  return (
    <div>
      <FiltersBar />
      {data?.map((pokemon) => (<ListCard key={pokemon.id} pokemon={pokemon} onClick={() => navigate(`/pokemon/${pokemon.name}`)} />))}
      <div className="flex justify-end border-t-[1px] border-t-stone-400 px-2 py-4 my-4">
        <Pagination
          currentPage={Number(currentPage)}
          totalPages={totalPages - 1}
          totalItems={totalItems}
          onPrev={onPrevPage}
          onNext={onNextPage}
          firstPage={currentPage === 1}
          lastPage={currentPage === totalPages - 1}
        />
      </div>
    </div>
  )
}

export default Home
