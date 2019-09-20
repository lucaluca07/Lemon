import * as React from 'react';
import classnames from 'classnames';
import CheckBox from '../checkbox';
import Icon from '../icon';
import './task.less';

export default class Task extends React.Component {
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
        <Icon className="l-task-more" type="more"/>
      </li>
    )
  }
}