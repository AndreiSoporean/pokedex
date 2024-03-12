import { useNavigate, useLocation } from "react-router-dom";

function useQueryParams() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const getQueryParams = () => {
    const paramsArray = Array.from(searchParams.keys());
    const paramsObject: Record<string, string> = paramsArray.reduce(
      (acc: Record<string, string>, key) => {
        acc[key] = searchParams.get(key) as string;
        return acc;
      },
      {} as Record<string, string>,
    );
    return paramsObject;
  };

  const getQueryParam = (param:string) => {
    return searchParams.get(param);
  };

  const removeQueryParam = (param:string) => {
    searchParams.delete(param);
    const newPath = `${location.pathname}?${searchParams.toString()}`;
    navigate(newPath);
  };

  const setQueryParams = (params: Record<string, string>) => {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        searchParams.set(key, params[key]);
      }
    }

    const newPath = `${location.pathname}?${searchParams.toString()}`;
    navigate(newPath);
  };

  return { getQueryParams, getQueryParam, setQueryParams, removeQueryParam };
}

export default useQueryParams;