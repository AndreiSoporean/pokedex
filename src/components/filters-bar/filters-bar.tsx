import { useEffect, useMemo, useState } from "react";
import { CustomInput } from "../input/custom-input";
import { CustomSelect } from "../select/custom-select";
import { FilterType, SelectOption } from "../../models/types";
import useFetch from "../../hooks/useFetch";
import useQueryParams from "../../hooks/useQueryParams";
import classNames from "classnames";

const FiltersBar = () => {
  const { getPokemonTypes } = useFetch();
  const { setQueryParams, getQueryParam } = useQueryParams();
  const [searchString, setSearchString] = useState(getQueryParam("name") || "");
  const [selectedType, setSelectedType] = useState<SelectOption>();
  const [options, setOptions] = useState<SelectOption[] | null>();
  const [allFilters, setAllFilters] = useState<Partial<FilterType>>({});

  useEffect(() => {
    getTypes()
  }, [])

  const getTypes = async () => {
    const types = await getPokemonTypes();
    setOptions(types);
  }

  const onChangeSearchString = (value: string) => {
    setSearchString(value);
    if (value !== "") {
      updateFilters({ name: value });
    } else {
      const optionFilterName = "name";
      const { [optionFilterName]: _, ...remainingFilters } = allFilters;
      console.log(remainingFilters);

      setAllFilters(remainingFilters);
    }
  };

  const onChangeType = (option: SelectOption) => {
    setSelectedType(option);
    if (option.name) {
      updateFilters({ type: option.name });
    }
  };

  const updateFilters = (newFilter: Partial<FilterType>) => {
    const newFilters = {
      ...allFilters,
      ...newFilter,
    };

    setAllFilters(newFilters);
  };

  const onApplyFilters = () => {
    console.log(allFilters);
    setQueryParams(allFilters as Record<string, string>);
  }

  const disabledApplyButton = useMemo(() => {
    return Object.keys(allFilters).length === 0;
  }, [allFilters])

  
  const applyBtnStyles = classNames(
    "max-w-[100px] border-amber-900 p-2 rounded-md w-full uppercase font-bold",
    { "bg-amber-950 cursor-not-allowed text-amber-900": disabledApplyButton},
    { "bg-amber-800": !disabledApplyButton},
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
      <CustomInput
        label="Filter by name"
        placeholder="e.g: Pikachu"
        onChange={onChangeSearchString}
        value={searchString}
      />
      <CustomSelect
        label="Filter by type"
        mainClassName="flex text-sm lowercase text-amber-200 p-2 border border-amber-900 rounded-md h-10 bg-yellow-950"
        selectedClassName="flex justify-between items-center"
        itemClassName="text-sm lowercase text-amber-200 p-2 border border-amber-900 rounded-sm hover:bg-yellow-900 hover:text-amber-300"
        options={options || []}
        onChange={(val) => {
          onChangeType(val);
        }}
        value={selectedType?.name || ""}
      />
      <div className="flex items-end justify-end gap-6 text-white text-sm">
        <button className={applyBtnStyles} onClick={onApplyFilters} disabled={disabledApplyButton}>apply</button>
      </div>
    </div>
  );
}

export default FiltersBar;