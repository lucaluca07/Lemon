import React, { useMemo } from 'react';
import classnames from 'classnames';
import useSearch from 'src/hooks/useSearch';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import Checkbox from 'src/components/checkbox';
import CommonAdd from 'src/components/common-add';

const Detail: React.FC = () => {
  const { taskId } = useSearch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const task = useMemo(() => {
    return tasks?.find((task) => task.id === taskId);
  }, [taskId, tasks]);
  return (
    <div className={classnames('detail', { 'detail-hide': !taskId })}>
      {taskId && (
        <>
          <div className="detail-header">
            <div className="detail-title">
              <Checkbox /> <input type="text" value={task!.title} />
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
            <div className="detail-content">描述</div>
          </div>
          <div className="detail-footer">项目 优先级 删除 更多</div>
        </>
      )}
    </div>
  );
};

export default Detail;
