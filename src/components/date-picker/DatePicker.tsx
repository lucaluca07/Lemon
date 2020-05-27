import React, { useState, useMemo, useRef, useCallback } from 'react';
import Popover from 'src/components/popover';
import dayjs, { Dayjs } from 'dayjs';
import Calendar from 'src/components/calendar';
import classNames from 'classnames';
import Button from '../button';
import Icon from 'src/components/icon';

interface IProps {
  value?: string | number | string;
  onChange: (value: Dayjs) => void;
  renderLabel?: (label: Dayjs | undefined) => string;
}

const defaultRenderLabel = (date: Dayjs | undefined) => (
  <div className="date-picker-render-label">
    {date === undefined ? (
      <>
        <Icon type="calendar" />
        <span>设置时间</span>
      </>
    ) : (
      <>
        <Icon type={`calendar-${date.get('day') + 1}`} />
        <span>{date.format('YYYY/MM/DD')}</span>
      </>
    )}
  </div>
);

const DatePicker: React.FC<IProps> = ({
  onChange,
  value,
  renderLabel = defaultRenderLabel,
}) => {
  const [date, setDate] = useState(
    value === undefined
      ? undefined
      : dayjs.isDayjs(value)
      ? value
      : dayjs(value),
  );

  const handleOk = useCallback(() => {
    if (!date) return;
    onChange(date);
  }, [onChange, date]);
  const handleCancel = useCallback(() => {
    setDate(
      value === undefined
        ? undefined
        : dayjs.isDayjs(value)
        ? value
        : dayjs(value),
    );
  }, [value]);
  const content = useMemo(() => {
    return (
      <div className="date-picker">
        <Calendar onChange={setDate} type="card" date={date} />
        <div className="date-picker-footer">
          <Button
            onClick={handleCancel}
            data-popover-hide
            style={{ marginRight: 4 }}
            size="small"
          >
            取消
          </Button>
          <Button
            disabled={!date}
            data-popover-hide
            onClick={handleOk}
            size="small"
            type="primary"
          >
            确定
          </Button>
        </div>
      </div>
    );
  }, [onChange, date]);

  return (
    <Popover style={{ padding: 0 }} content={content}>
      <div className="date-picker-render">{renderLabel(date)}</div>
    </Popover>
  );
};

export default DatePicker;
