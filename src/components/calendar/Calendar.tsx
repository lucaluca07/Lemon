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

  componentDidMount() {
  }

  handleClick = (day: day.Dayjs) => {
    this.setState({ current: day });
  }

  render() {
    const { fullscreen } = this.props;
    const { current } = this.state;
    const classString = classnames('l-calendar', {'l-calendar-fullscreen' : fullscreen})
    return (
      <div className={classString}>
        <TBody current={current} onClick={this.handleClick}/>
      </div>
    )
  }
}
