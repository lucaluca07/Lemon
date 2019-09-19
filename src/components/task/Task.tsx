import * as React from 'react';
import classnames from 'classnames';
import CheckBox from '../checkbox';
import './task.less';

export default class Task extends React.Component {
  render() {
    return (
      <li className="l-task">
        <div className="l-task-content">
          <CheckBox />
          <span className="l-task-title">
            测试一下
          </span>
        </div>
      </li>
    )
  }
}