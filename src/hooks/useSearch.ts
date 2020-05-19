import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useSearch = () => {
  const location = useLocation();
  return useMemo(() => {
    const search = location.search;
    let params: { [key: string]: string } = {};
    if (search) {
      search
        .slice(1)
        .split('&')
        .forEach((item) => {
          const [key, value] = item.split('=');
          params[key] = value;
        });
    }
    return params;
  }, [location.search]);
};

export default useSearch;
