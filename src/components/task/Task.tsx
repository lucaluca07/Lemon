import * as React from 'react';
import classnames from 'classnames';
import CheckBox from '../checkbox';
import Editor from '../editor';
import Icon from '../icon';
import './task.less';

export interface TaskProps {
  edit?: boolean;
}

export interface TaskState {
  isEdit?: boolean;
}

export default class Task extends React.Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
    super(props);
    const isEdit = props.edit || false;
    this.state = {
      isEdit,
    };
  }
  render() {
    const { isEdit } = this.state;

    return (
      <li className="l-task">
        {!isEdit && (
          <div className="l-task-inner">
            <Icon className="l-task-drag" type="drag" />
            <div className="l-task-content">
              <CheckBox />
              <span className="l-task-title">测试一下</span>
              <span className="l-task-tags" />
              <span className="l-task-todo" />
              <span className="l-task-date" />
            </div>
            <Icon className="l-task-more" type="more" />
          </div>
        )}

        {isEdit && <Editor />}
      </li>
    );
  }
}
