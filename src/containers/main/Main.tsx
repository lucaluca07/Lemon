import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import Editor from 'src/components/editor';
import CommonAdd from 'src/components/common-add';
import Tasks from 'src/components/tasks';
import { addTask, updateTask } from 'src/store/tasks';

const Main: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const { tasks } = useSelector((state: RootState) => state.tasks);
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
          onSubmit={(title) => {
            dispatch(addTask({ title }));
            setShowInput(false);
          }}
          onCancel={() => setShowInput(false)}
        />
      )}
    </div>
  );
};

export default Main;
