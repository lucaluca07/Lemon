import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { RootState } from 'src/store/reducer';

const projects = ['inbox', 'project'];
const useSelectorTask = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const location = useLocation();

  const currentTasks = useMemo(() => {
    const params = location.pathname.split('/');
    const path = params[1];
    if (projects.includes(path)) {
      const projectId = path === 'inbox' ? 'inbox' : params[2];
      return tasks.filter((task) => task.projectId === projectId);
    }
    return tasks;
  }, [location.pathname]);

  return currentTasks;
};

export default useSelectorTask;
