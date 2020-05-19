import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useSelectorTask from 'src/hooks/useSelectedTask';
import Editor from 'src/containers/editor';
import CommonAdd from 'src/components/common-add';
import Tasks from 'src/components/tasks';
import { addTask, updateTask } from 'src/store/tasks';
import usePathname from 'src/hooks/usePathname';

const Main: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const tasks = useSelectorTask();
  const dispatch = useDispatch();
  const history = useHistory();
  const pathname = usePathname();
  const updateTaskStatus = useCallback(
    (id, completed) => {
      dispatch(updateTask({ id, completed }));
    },
    [tasks],
  );

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setShowInput(false);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);
  return (
    <div className="main">
      <header className="main-header">
        <h1>test</h1>
      </header>
      <Tasks
        tasks={tasks}
        onClick={(id: string) => history.push(`${pathname}/${id}`)}
        updateTaskStatus={updateTaskStatus}
      />
      {!showInput && (
        <CommonAdd
          name="添加任务"
          className="add-task"
          style={{ paddingLeft: 0 }}
          onClick={() => {
            history.push(pathname);
            setShowInput(true);
          }}
        />
      )}
      {showInput && (
        <Editor
          onSubmit={({ title, projectId }) => {
            dispatch(addTask({ title, projectId }));
          }}
          onCancel={() => setShowInput(false)}
        />
      )}
    </div>
  );
};

export default Main;
