import classnames from 'classnames';
import day from 'dayjs';
import * as React from 'react';

import './tbody.less';

export interface TBodyProps {
  fullscreen?: boolean;
  current: day.Dayjs;
  onClick: (day: day.Dayjs) => void;
}

export default class TBody extends React.Component<TBodyProps> {
  public componentDidMount() {

  }

  public handleClick = (day: day.Dayjs) => {
    const { onClick } = this.props;
    if (onClick) onClick(day);
  }

  public renderDays() {
    const days: day.Dayjs[] = [];
    const current = this.props.current;
    const currentStart: day.Dayjs = current.startOf('month');
    const currentEnd: day.Dayjs = current.endOf('month');
    const start = currentStart.startOf('week');
    const end = currentEnd.endOf('week');

    if (!current.isSame(start, 'month')) {
      const length = start.endOf('month').diff(start, 'day');
      for (let i = 0; i <= length; i++) {
        days.push(start.add(i, 'day'));
      }
    }

    const length = currentEnd.diff(currentStart, 'day');

    for (let i = 0; i <= length; i++) {
      days.push(currentStart.add(i, 'day'));
    }

    if (!current.isSame(end, 'month')) {
      const length = end.diff(end.startOf('month'), 'day');
      for (let i = length; i >= 0; i--) {
        days.push(end.subtract(i, 'day'));
      }
    }

    const arr = [];
    while (days.length > 0) {
      arr.push(days.splice(0, 7));
    }

    const className = (item: day.Dayjs) => {
      console.log(item.isSame(current, 'day'), item.date(), 'day');
      return classnames('l-calendar-cell', {
        'l-calendar-prev-cell': item.isBefore(current, 'month'),
        'l-calendar-next-cell': item.isAfter(current, 'month'),
        'l-calendar-cell-selected': item.isSame(current, 'day'),
        'l-calendar-first-day-of-month': item.startOf('month').isSame(item, 'day'),
        'l-calendar-last-day-of-month': item.endOf('month').isSame(item, 'day')
      });
    };
    return arr.map((el, index) => {
      return (
        <tr key={index}>
          {el.map(item => {
            const currentString = item.format('YYYY年MM月DD日');
            return (
              <td
                className={className(item)}
                title={currentString}
                key={currentString}
              >
                <div className="l-calendar-date" onClick={() => this.handleClick(item)}>
                  <span className="l-calendar-cell-value">{item.format('DD')}</span>
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  }

  public render() {
    return (
      <table className="l-calendar-table">
        <thead>
          <tr>
            {['日', '一', '二', '三', '四', '五', '六'].map(el => (
              <th key={el} className="l-calendar-table-header" title={`周${el}`}>
                <span>{el}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{this.renderDays()}</tbody>
      </table>
    );
  }
}
