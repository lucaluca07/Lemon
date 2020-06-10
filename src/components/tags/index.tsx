import React, { useState, useRef, useEffect } from 'react';
import Button from '../button';
import Tag, { ITag } from '../tag';
import Input from '../input';
import './style.less';

interface IProps {
  tags?: { id: string; tag: string }[];
  onAddTag?: (tag: string) => void;
  onDeleteTag?: (tagId: string) => void;
}

const Tags: React.FC<IProps> = ({ tags = [], onAddTag, onDeleteTag }) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [visible, inputRef.current]);
  return (
    <>
      {tags.map((item) => (
        <Tag
          onClose={() => onDeleteTag?.(item.id)}
          tag={item.tag}
          key={String(item.tag)}
        />
      ))}
      {!visible && (
        <Button
          onClick={() => {
            setVisible(true);
          }}
          type="primary"
          style={{ fontWeight: 500, fontSize: 12 }}
        >
          新增标签
        </Button>
      )}
      {visible && (
        <Input
          ref={inputRef}
          style={{
            border: '1px solid #52c41a',
            background: '#f6ffed',
            color: '#52c41a',
            fontSize: 12,
          }}
          placeholder="输入标签"
          className="tag-input"
          onBlur={() => setVisible(false)}
          onEnter={(e) => {
            setVisible(false);
            onAddTag?.((e.target as any).value);
          }}
        />
      )}
    </>
  );
};

export default Tags;
