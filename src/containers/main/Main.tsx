import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import useSelectorTask from 'src/hooks/useSelectedTask';
import Editor from 'src/containers/editor';
import CommonAdd from 'src/components/common-add';
import Tasks from 'src/components/tasks';
import { addTask, updateTask } from 'src/store/tasks';

const Main: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const tasks = useSelectorTask();
  const dispatch = useDispatch();
  const updateTaskStatus = useCallback(
    (id, completed) => {
      dispatch(updateTask({ id, completed }));
    },
    [tasks],
  );
  return (
    <div className="main">
      <header className="main-header">
        <h1>test</h1>
      </header>
      <Tasks tasks={tasks} updateTaskStatus={updateTaskStatus} />
      {!showInput && (
        <CommonAdd
          name="添加任务"
          className="add-task"
          style={{ paddingLeft: 0 }}
          onClick={() => {
            setShowInput(true);
          }}
        />
      )}
      {showInput && (
        <Editor
          onSubmit={({ title, projectId }) => {
            dispatch(addTask({ title, projectId }));
            setShowInput(false);
          }}
          onCancel={() => setShowInput(false)}
        />
      )}
    </div>
  );
};

export default Main;
