import React, { useMemo, useCallback, useState } from 'react';
import classnames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import DatePicker from 'src/components/date-picker';
import SubTasks from './SubTasks';
import usePathname from 'src/hooks/usePathname';
import Tags from 'src/components/tags';
import { addTag } from 'src/store/tags';

const Detail: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const history = useHistory();
  const pathname = usePathname();
  const { taskId } = useParams();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const tags = useSelector((state: RootState) => state.tags);
  const dispatch = useDispatch();
  const task = useMemo(() => {
    return tasks.find((task) => task.id === taskId);
  }, [taskId, tasks]);
  const taskTags = useMemo(() => {
    return (
      task?.tags?.map((tag) => tags.find((item) => item.id === tag)) || []
    ).filter((item) => item !== undefined);
  }, [task?.tags, tags]);

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
    history.push(pathname);
  }, [taskId]);

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
            <div className="">
              <DatePicker value={task?.date} onChange={updateTaskDate} />
              <Tags
                onDeleteTag={handleDeleteTag}
                tags={taskTags as []}
                onAddTag={handleAddTag}
              />
            </div>
          </div>
          <div className="detail-body">
            <SubTasks
              items={task!.items || []}
              updateTaskItem={updateTaskItem}
            />
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
