import classnames from 'classnames';
import * as React from 'react';
import CheckBox from '../checkbox';
import Editor from '../editor';
import Icon from '../icon';

import { keyCodes } from '../../utils/contants';
import './task.less';

export interface TaskProps {
  edit?: boolean;
}

export interface TaskState {
  isEdit?: boolean;
}

export default class Task extends React.Component<TaskProps, TaskState> {
  public liRef: HTMLLIElement;
  public constructor(props: TaskProps) {
    super(props);
    const isEdit = props.edit || false;
    this.state = {
      isEdit
    };
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.onKeyDownListener);
    window.addEventListener('click', this.onClickListener, true);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDownListener);
    window.removeEventListener('click', this.onClickListener);
  }

  private saveLi = (el: HTMLLIElement) => {
    this.liRef = el;
  }

  private onKeyDownListener = (event: KeyboardEvent) => {
    if (!this.state.isEdit) return;
    if (event.keyCode === keyCodes.enterKeyCode) {
      this.handleHideEditor();
    }
  }

  private onClickListener = (event: MouseEvent) => {
    if (!this.state.isEdit) return;
    const target = event.target as HTMLElement;
    const isLIRefOrChild = target === this.liRef || this.liRef.contains(target);
    if (!isLIRefOrChild) {
      this.handleHideEditor();
    }
  }

  private handleHideEditor = () => {
    this.setState({ isEdit: false });
  }

  private handleClickTitle = () => {
    this.setState({ isEdit: true });
  }

  public render() {
    const { isEdit } = this.state;
    return (
      <li ref={this.saveLi} className="l-task">
        {!isEdit && (
          <div className="l-task-inner">
            <Icon className="l-task-drag" type="drag" />
            <div className="l-task-content">
              <CheckBox />
              <span className="l-task-title" onClick={this.handleClickTitle}>
                测试一下
              </span>
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
