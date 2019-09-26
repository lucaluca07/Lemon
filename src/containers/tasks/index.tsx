import * as React from 'react';
import Task from '../../components/task';
import Calendar from '../../components/calendar';

export default class Tasks extends React.Component {
  render() {
    return (
      <>
        <Task />
        <Task edit/>
        <Calendar />
      </>
    )
  }
}