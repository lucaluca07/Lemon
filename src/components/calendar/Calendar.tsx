import * as React from 'react';
import day from 'dayjs';
import classnames from 'classnames';
import TBody from './Tbody';

import './calendar.less';

export interface CalendarProps {
  fullscreen?: boolean;
}

export default class Calendar extends React.Component<CalendarProps>{

  static defaultProps = {
    fullscreen: true,
  }

  componentDidMount() {
    console.log(day().startOf('month').date());
    console.log(day().endOf('month').date());
  }

  render() {
    const { fullscreen } = this.props;
    const classString = classnames('l-calendar', {'l-calendar-fullscreen' : fullscreen})
    return (
      <div className="l-calendar">
        <TBody/>
      </div>
    )
  }
}
