import React, { useMemo, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import Icon from 'src/components/icon';
import classNames from 'classnames';
import Popover from 'src/components/popover';

interface IProps {
  onChange?: (date: dayjs.Dayjs) => void;
  date?: dayjs.Dayjs | string | number;
  type?: 'card' | 'fullScreen';
}

const today = dayjs(Date.now());
const weeks = ['一', '二', '三', '四', '五', '六', '日'];
const currentYear = today.get('year');
const startYear = currentYear - 10;
const endYear = currentYear + 9;
const years: number[] = [];
for (let i = startYear; i <= endYear; i++) {
  years.push(i);
}

const months = Array(12)
  .fill('')
  .map((item, i) => i + 1);

const getDays = (date: dayjs.Dayjs) => {
  const monthStart: dayjs.Dayjs = date.startOf('month');
  const monthEnd: dayjs.Dayjs = date.endOf('month');
  const start = monthStart.startOf('week');
  const end = monthEnd.endOf('week');
  const length = end.diff(start, 'day');
  const weeks: dayjs.Dayjs[][] = [];
  for (let i = 0; i <= length; i++) {
    const index = Math.floor(i / 7);
    weeks[index] = [...(weeks[index] || []), start.add(i + 1, 'day')];
  }
  return weeks;
};

const Calendar: React.FC<IProps> = ({ date, type, onChange }) => {
  const [current, setCurrent] = useState(
    dayjs.isDayjs(date) ? date : dayjs(date),
  );
  const [selected, setSelected] = useState<dayjs.Dayjs | undefined>(
    dayjs.isDayjs(date) ? date : dayjs(date),
  );
  const days = useMemo(() => {
    return getDays(current);
  }, [current]);

  const yearContent = useMemo(() => {
    return (
      <ul className={classNames('calendar-list', `calendar-${type}-list`)}>
        {years.map((item) => (
          <li
            onClick={() => setCurrent(current.year(item))}
            className={classNames('calendar-list-item', {
              'calendar-list-item-selected': current.get('year') === item,
            })}
            data-popover-hide
            key={item}
          >
            {item}年
          </li>
        ))}
      </ul>
    );
  }, [current, type]);
  const monthContent = useMemo(() => {
    return (
      <ul className={classNames('calendar-list', `calendar-${type}-list`)}>
        {months.map((item) => (
          <li
            onClick={() => setCurrent(current.month(item - 1))}
            className={classNames('calendar-list-item', {
              'calendar-list-item-selected': current.get('month') + 1 === item,
            })}
            data-popover-hide
            key={item}
          >
            {item}月
          </li>
        ))}
      </ul>
    );
  }, [current, type]);

  const handleSetSelectedChange = useCallback(
    (date: dayjs.Dayjs) => {
      setSelected(date);
      onChange?.(date);
    },
    [onChange],
  );
  return (
    <div className={classNames('calendar', `calendar-${type}`)}>
      <header className="calendar-header">
        <div className="calendar-header-left">
          <Popover style={{ padding: 0 }} content={yearContent}>
            <span>{current.get('year')}年</span>
          </Popover>
          <Popover style={{ padding: 0 }} content={monthContent}>
            <span>{current.get('month') + 1}月</span>
          </Popover>
        </div>
        <div className="calendar-header-right">
          <Icon
            type="prev"
            onClick={() => setCurrent(current.add(-1, 'month'))}
          />
          <span
            onClick={() => {
              setCurrent(today);
            }}
            className="calendar-today"
          >
            今天
          </span>
          <Icon
            type="next"
            onClick={() => setCurrent(current.add(1, 'month'))}
          />
        </div>
      </header>
      <main className="calendar-main">
        <table>
          <thead>
            <tr>
              {weeks.map((item) => (
                <th className="calendar-column-header" key={item}>
                  <span className="calendar-column-header-inner">{item}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((item, i) => (
              <tr key={i}>
                {item.map((day) => (
                  <td
                    className={classNames('cell', {
                      today: day.isSame(today, 'day'),
                      selected: selected && day.isSame(selected, 'day'),
                      'next-month': day.isAfter(current, 'month'),
                      'prev-month': day.isBefore(current, 'month'),
                    })}
                    key={day.toString()}
                  >
                    <div
                      className="calendar-date"
                      onClick={() => handleSetSelectedChange(day)}
                    >
                      <div className="calendar-value">
                        <Icon type="plus" />
                        <span title={day.format('YYYY/MM/DD')}>
                          {day.get('date')}
                        </span>
                      </div>
                      <div className="calendar-content">content</div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Calendar;
