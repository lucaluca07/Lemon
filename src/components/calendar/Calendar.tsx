import * as React from 'react';
import day from 'dayjs';
import TBody from './Tbody';

import './calendar.less';

export default class Calendar extends React.Component{

  componentDidMount() {
    console.log(day().startOf('month').date());
    console.log(day().endOf('month').date());
  }

  render() {

    return (
      <div className="l-calendar">
        <TBody />
      </div>
    )
  }
}
