import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { useParams } from 'react-router-dom';
import { updateTask } from 'src/store/tasks';
import SubTasks from '../tasks';
import MDEditor from 'src/components/md-editor';
import { RawDraftContentState } from 'draft-js';

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const task = useMemo(() => {
    return tasks.find((task) => task.id === taskId);
  }, [taskId, tasks]);

  const updateTaskItem = useCallback(
    (items) => {
      dispatch(
        updateTask({
          id: taskId,
          items,
        }),
      );
    },
    [taskId],
  );

  const handleChangeContent = useCallback(
    (content: RawDraftContentState) => {
      dispatch(updateTask({ id: taskId, content }));
    },
    [taskId],
  );

  return (
    <div className="detail-body">
      <SubTasks items={task!.items || []} updateTaskItem={updateTaskItem} />
      <div className="detail-content">
        <MDEditor
          onChange={handleChangeContent}
          content={task?.content}
          placeholder="备注"
        />
      </div>
    </div>
  );
};

export default Content;
