import * as React from 'react';
import classnames from 'classnames';
import day from 'dayjs';

import './tbody.less';

export interface TBodyProps {
  fullscreen?: boolean;
}

export default class TBody extends React.Component<TBodyProps> {
  componentDidMount() {
    console.log(
      day()
        .startOf('month')
        .date(),
    );
    console.log(
      day()
        .endOf('month')
        .date(),
    );
  }

  renderDays() {
    const days: day.Dayjs[] = [];
    const current = day();
    const currentMonth: number = current.month();
    const currentStart: day.Dayjs = current.startOf('month');
    const currentEnd: day.Dayjs = current.endOf('month');

    const before = currentStart.startOf('week');
    const after = currentEnd.endOf('week');

    const beforeMonth = before.month();
    if (beforeMonth !== currentMonth) {
      const beforeEnd = before.endOf('month');
      const length = beforeEnd.diff(before, 'day');
      for (let i = 0; i <= length; i++) {
        days.push(before.add(i, 'day'));
      }
    }

    const length = currentEnd.diff(currentStart, 'day');

    for (let i = 0; i <= length; i++) {
      days.push(currentStart.add(i, 'day'));
    }

    const afterMonth = after.month();

    if (afterMonth !== currentMonth) {
      const afterStart = after.startOf('month');
      const length = after.diff(afterStart, 'day');
      for (let i = 0; i <= length; i++) {
        days.push(afterStart.add(i, 'day'));
      }
    }

    const arr = [];
    while (days.length > 0) {
      arr.push(days.splice(0, 7));
    }

    const className = (item: day.Dayjs) => {
      return classnames('l-calendar-table-cell', {
        'l-calendar-table-prev-cell':
          beforeMonth !== currentMonth && item.month() === beforeMonth,
        'l-calendar-table-next-cell':
          afterMonth !== currentMonth && item.month() === afterMonth,
        'l-calendar-table-current-day-cell':
          currentMonth === item.month() && item.date() === current.date(),
        'l-calendar-table-first-day-of-month':
          item.date() === item.startOf('month').date(),
        'l-calendar-table-last-day-of-month':
          item.date() === item.endOf('month').date(),
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
                <span className="l-calendar-table-cell-value">{item.format('DD')}</span>
              </td>
            );
          })}
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="l-calendar-table">
        <thead>
          <tr>
            {['日', '一', '二', '三', '四', '五', '六'].map(el => (
              <th className="l-calendar-table-header" title={`周${el}`}>
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
