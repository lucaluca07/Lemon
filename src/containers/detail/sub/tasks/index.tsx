import React, { useState, useRef, useEffect, useCallback } from 'react';
import CommonAdd from 'src/components/common-add';
import Input from 'src/components/input';
import Checkbox from 'src/components/checkbox';

interface IProps {
  updateTaskItem: (items: any[]) => void;
  items: any[];
}

const SubTasks: React.FC<IProps> = ({ updateTaskItem, items = [] }) => {
  const [value, setValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(() => {
    if (!value) return;
    updateTaskItem([
      ...items,
      { id: String(Date.now()), title: value, status: 1 },
    ]);
    setValue('');
  }, [value, items]);
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput, inputRef]);

  return (
    <div className="detail-sub-tasks">
      <ul className="detail-sub-list">
        {items.map((item) => (
          <li key={item.id}>
            <Checkbox />
            <span className="detail-sub-task-title">{item.title}</span>
            <i
              className="iconfont icon-delete"
              onClick={() => {
                updateTaskItem(items.filter((el) => item.id !== el.id));
              }}
            />
          </li>
        ))}
      </ul>
      {!showInput && (
        <CommonAdd
          name="添加子任务"
          className="add-task"
          style={{ paddingLeft: 0 }}
          onClick={() => {
            setShowInput(true);
          }}
        />
      )}
      {showInput && (
        <div className="detail-sub-add">
          <Checkbox />
          <Input
            ref={inputRef}
            style={{ border: 'none' }}
            placeholder="点击回车添加子任务"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onEnter={handleSubmit}
            onBlur={() => {
              handleSubmit();
              setShowInput(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SubTasks;
