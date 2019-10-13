import * as React from 'react';
import Calendar from '../../components/calendar';
import Task from '../../components/task';

export default class Tasks extends React.Component {
  public render() {
    return (
      <>
        <Task />
        <Task edit/>
        <Calendar />
      </>
    );
  }
}
