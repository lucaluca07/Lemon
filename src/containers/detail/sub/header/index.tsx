import React, { useMemo, useCallback } from 'react';
import Checkbox from 'src/components/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { useParams } from 'react-router-dom';
import { updateTask } from 'src/store/tasks';
import { addTag } from 'src/store/tags';
import DatePicker from 'src/components/date-picker';
import Tags from 'src/components/tags';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const tags = useSelector((state: RootState) => state.tags);
  const task = useMemo(() => {
    return tasks.find((task) => task.id === taskId);
  }, [taskId, tasks]);
  const taskTags = useMemo(() => {
    return (
      task?.tags?.map((tag) => tags.find((item) => item.id === tag)) || []
    ).filter((item) => item !== undefined);
  }, [task?.tags, tags]);
  const handleChangeTitle = useCallback(
    (title: string) => {
      dispatch(updateTask({ id: taskId, title }));
    },
    [taskId],
  );
  const updateTaskStatus = useCallback(
    (completed: boolean) => {
      dispatch(updateTask({ id: taskId, completed }));
    },
    [taskId],
  );

  const updateTaskDate = useCallback(
    (date) => {
      dispatch(updateTask({ id: taskId, date: Number(date.format('x')) }));
    },
    [taskId],
  );
  const handleAddTag = useCallback(
    (tag) => {
      if (taskTags.find((item) => item!.tag === tag)) return;
      const currentTag = tags.find((item) => item.tag === tag);
      let id = String(Date.now());
      if (currentTag) {
        id = currentTag.id;
      } else {
        dispatch(addTag({ id, tag }));
      }
      dispatch(updateTask({ id: taskId, tags: [...(task?.tags || []), id] }));
    },
    [taskId, taskTags],
  );

  const handleDeleteTag = useCallback(
    (tagId) => {
      const tags = task?.tags?.filter((item) => item !== tagId);
      dispatch(updateTask({ id: taskId, tags }));
    },
    [taskId, taskTags],
  );
  return (
    <div className="detail-header">
      <div className="detail-title">
        <Checkbox
          checked={task?.completed}
          onChange={(completed) => {
            updateTaskStatus(completed);
          }}
        />
        <input
          type="text"
          onChange={(e) => handleChangeTitle(e.target.value)}
          value={task!.title}
        />
      </div>
      <div className="detail-info">
        <DatePicker value={task?.date} onChange={updateTaskDate} />
        <Tags
          onDeleteTag={handleDeleteTag}
          tags={taskTags as []}
          onAddTag={handleAddTag}
        />
      </div>
    </div>
  );
};

export default Header;
