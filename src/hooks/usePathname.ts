import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const usePathname = () => {
  const location = useLocation();
  const params = useParams<{ taskId?: string }>();
  return useMemo(() => {
    const { taskId } = params;
    return taskId
      ? location.pathname.replace(`/${taskId}`, '')
      : location.pathname;
  }, [location.pathname, params]);
};

export default usePathname;
