import React, { useMemo, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import { useParams, useHistory } from 'react-router-dom';
import { updateTask, deleteTask } from 'src/store/tasks';
import Button from 'src/components/button';
import Projects from 'src/containers/editor/Projects';
import Popover from 'src/components/popover';
import Popconfirm from 'src/components/popconfirm';
import usePathname from 'src/hooks/usePathname';

const Footer: React.FC = () => {
  const history = useHistory();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const task = useMemo(() => {
    return tasks.find((task) => task.id === taskId);
  }, [taskId, tasks]);

  const handleChangeProject = useCallback(
    (project: { id: string }) => {
      dispatch(updateTask({ id: taskId, projectId: project.id }));
    },
    [taskId],
  );

  const handleDeleteTask = useCallback(() => {
    dispatch(deleteTask(taskId));
    history.push(pathname);
  }, [taskId]);

  return (
    <div className="detail-footer">
      <Popover
        clickContentHide
        style={{ padding: 0 }}
        content={
          <Projects
            selectedId={task?.projectId || ''}
            onChange={handleChangeProject}
          />
        }
      >
        <Button title="选择项目" type="icon">
          <i className="iconfont icon-send" />
        </Button>
      </Popover>
      <div>
        <Popconfirm onOk={handleDeleteTask} title="确定删除此任务？">
          <Button title="删除" type="icon">
            <i className="iconfont icon-dustbin" />
          </Button>
        </Popconfirm>
        <Popover content="选择项目">
          <Button title="设置优先级" type="icon">
            <i className="iconfont icon-priority3" />
          </Button>
        </Popover>
        <Popover content="选择项目">
          <Button title="添加提醒" type="icon">
            <i className="iconfont icon-more" />
          </Button>
        </Popover>
      </div>
    </div>
  );
};

export default Footer;
