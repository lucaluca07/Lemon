import React, { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useSearch from 'src/hooks/useSearch';
import { RootState } from 'src/store/reducer';
import Checkbox from 'src/components/checkbox';
import CommonAdd from 'src/components/common-add';
import MDEditor from 'src/components/md-editor';
import { updateTask, deleteTask } from 'src/store/tasks';
import { RawDraftContentState } from 'draft-js';
import Button from 'src/components/button';
import Popover from 'src/components/popover';
import Popconfirm from 'src/components/popconfirm';
import Projects from 'src/containers/editor/Projects';

const Detail: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
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

  const handleChangeProject = useCallback(
    (project: { id: string }) => {
      dispatch(updateTask({ id: taskId, projectId: project.id }));
    },
    [taskId],
  );

  const handleDeleteTask = useCallback(() => {
    dispatch(deleteTask(taskId));
    history.push(location.pathname);
  }, [taskId]);

  const updateTaskStatus = useCallback(
    (completed: boolean) => {
      dispatch(updateTask({ id: taskId, completed }));
    },
    [taskId],
  );

  return (
    <div className={classnames('detail', { 'detail-hide': !taskId })}>
      {taskId && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Detail;
