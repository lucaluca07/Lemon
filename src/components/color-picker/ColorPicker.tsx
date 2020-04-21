import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import colors, { baseColors } from 'src/utils/colors';

const keyFrames = [{ opacity: 0 }, { opacity: 1 }];

const option: {
  duration: number;
  fill: 'both';
} = {
  duration: 150,
  fill: 'both',
};

const reverseOptions: {
  duration: number;
  direction: 'reverse';
  fill: 'both';
} = {
  ...option,
  direction: 'reverse',
};

const ColorPicker: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const animateIn = useCallback(() => {
    moreRef?.current?.animate(keyFrames, option);
    setVisible(true);
  }, [moreRef]);

  const animateOut = useCallback(async () => {
    if (!moreRef.current) return;
    // chrome 不支持 Animation.finished
    await moreRef.current.animate(keyFrames, reverseOptions);
    setTimeout(() => {
      setVisible(false);
    }, 150);
  }, [moreRef]);

  const handleClickMore = useCallback(() => {
    if (visible) {
      animateOut();
    } else {
      animateIn();
    }
  }, [visible]);

  return (
    <div className="color-picker">
      <ul className="color-picker-base">
        {Object.values(baseColors).map((color) => (
          <li
            className="color-picker-item"
            key={color}
            style={{ backgroundColor: color }}
          />
        ))}
        <li className="color-picker-more-btn" onClick={handleClickMore}>
          ···
        </li>
      </ul>
      <div
        ref={moreRef}
        hidden={!visible}
        className={classNames('color-picker-more')}
      >
        {colors.map((values) => (
          <ul className="color-picker-base" key={values.join()}>
            {values.map((color) => (
              <li
                className="color-picker-item"
                key={color}
                style={{ backgroundColor: color }}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
