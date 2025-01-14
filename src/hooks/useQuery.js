import { useLocation } from "react-router-dom";

const useQuery = (name) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get(name);
};

export default useQuery;
