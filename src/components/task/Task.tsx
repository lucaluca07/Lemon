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
    }
  }
  render() {
    return (
      <li className="l-task">
        <Icon className="l-task-drag" type="drag"/>
        <div className="l-task-content">
          <CheckBox />
          <span className="l-task-title">
            测试一下
          </span>
          <span className="l-task-tags"></span>
          <span className="l-task-todo"></span>
          <span className="l-task-date"></span>
        </div>
        <Editor />
        <Icon className="l-task-more" type="more"/>
      </li>
    )
  }
}