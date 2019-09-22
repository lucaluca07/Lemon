import * as React from 'react';
import Task from '../../components/task';

export default class Tasks extends React.Component {
  render() {
    return (
      <>
        <Task />
        <Task edit/>
      </>
    )
  }
}