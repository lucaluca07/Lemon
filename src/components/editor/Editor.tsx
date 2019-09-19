import * as React from 'react';
import classnames from 'classnames';
import CheckBox from '../checkbox';
import Input from '../input';

export default class Task extends React.Component {
  render() {
    return (
      <li className="l-task">
        <div className="l-editor">
          <div>
            <CheckBox />
            <Input />
          </div>
        </div>
      </li>
    )
  }
}
