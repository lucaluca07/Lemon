import React, { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import useSearch from 'src/hooks/useSearch';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import Checkbox from 'src/components/checkbox';
import CommonAdd from 'src/components/common-add';
import MDEditor from 'src/components/md-editor';
import { updateTask } from 'src/store/tasks';
import { RawDraftContentState } from 'draft-js';

const Detail: React.FC = () => {
  const { taskId } = useSearch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const task = useMemo(() => {
    return tasks?.find((task) => task.id === taskId);
  }, [taskId, tasks]);

  const handleChangeContent = useCallback(
    (content: RawDraftContentState) => {
      dispatch(updateTask({ id: taskId, content }));
    },
    [taskId],
  );

  const handleChangeTitle = useCallback(
    (title: string) => {
      dispatch(updateTask({ id: taskId, title }));
    },
    [taskId],
  );
  return (
    <div className={classnames('detail', { 'detail-hide': !taskId })}>
      {taskId && (
        <>
          <div className="detail-header">
            <div className="detail-title">
              <Checkbox />{' '}
              <input
                type="text"
                onChange={(e) => handleChangeTitle(e.target.value)}
                value={task!.title}
              />
            </div>
            <div>时间 标签</div>
          </div>
          <div className="detail-body">
            <div className="detail-sub-tasks">
              <CommonAdd
                name="添加子任务"
                className="add-task"
                style={{ paddingLeft: 0 }}
                onClick={() => {
                  // setShowInput(true);
                }}
              />
            </div>
            <div className="detail-content">
              <MDEditor
                onChange={handleChangeContent}
                content={task?.content}
                placeholder="备注"
              />
            </div>
          </div>
          <div className="detail-footer">
            <div>项目</div>
            <div>优先级 删除 更多</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
