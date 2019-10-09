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

  state = {
    current: day(),
  }

  handleSetCurrent = (day: day.Dayjs) => {
    this.setState({ current: day });
  }

  handleClickPrevMonth = () => {
    const { current } = this.state;
    this.handleSetCurrent(current.subtract(1, 'month'))
  }

  handleClickNextMonth = () => {
    const { current } = this.state;
    this.handleSetCurrent(current.add(1, 'month'))
  }

  render() {
    const { fullscreen } = this.props;
    const { current } = this.state;
    const classString = classnames('l-calendar', {'l-calendar-fullscreen' : fullscreen})
    return (
      <div className={classString}>
        <header className="l-calendar-header">
          <span className="l-calendar-prev-month" onClick={this.handleClickPrevMonth}>上个月</span>
          <span className="l-calendar-date">
            <span className="l-calendar-year">{current.year()}年</span>
            <span className="l-calendar-month">{current.month() + 1}月</span>
          </span>
          <span className="l-calendar-next-month" onClick={this.handleClickNextMonth}>下个月</span>
        </header>
        <TBody current={current} onClick={this.handleSetCurrent}/>
      </div>
    )
  }
}
