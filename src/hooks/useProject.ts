import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'src/store/reducer';

const useProject = () => {
  const location = useLocation();

  const currentProject = useMemo(() => {
    const params = location.pathname.split('/');
    const path = params[1];
    return path === 'inbox' ? 'inbox' : params[2];
  }, [location.pathname]);

  return currentProject;
};

export default useProject;
