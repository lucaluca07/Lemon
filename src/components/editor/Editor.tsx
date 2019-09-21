import * as React from 'react';
import classnames from 'classnames';
import CheckBox from '../checkbox';
import Input from '../input';
import './editor.less';

const TextArea = Input.TextArea;

export default class Task extends React.Component {
  input: Input;

  componentDidMount() {
    this.input.focus();
  }

  saveInput = (el: Input) => {
    this.input = el;
  }

  render() {
    return (
      <div className="l-editor">
        <div className="l-editor-input-wrapper">
          <CheckBox />
          <Input value="123" ref={this.saveInput} placeholder="新增任务" className="l-editor-input" />
        </div>
        <TextArea autosize placeholder="备注" style={{resize: 'none'}}/>
      </div>
    )
  }
}
