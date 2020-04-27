import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  Editor as DraftEditor,
  EditorState,
  getDefaultKeyBinding,
} from 'draft-js';
import Button from '../button';
import 'draft-js/dist/Draft.css';

interface IProps {
  onSubmit: (text: string) => void;
  onCancel: () => void;
  // value: string;
}

const emptyState = EditorState.createEmpty();

function keyBindingFn(e: any): string {
  if (e.keyCode === 13 /* `Enter` key */) {
    return 'save';
  }
  return getDefaultKeyBinding(e) as any;
}

const Editor: React.FC<IProps> = ({ onSubmit, onCancel }) => {
  const [editorState, setEditorState] = useState(emptyState);
  const editorRef = useRef<any>(null);
  const text = useMemo(() => editorState.getCurrentContent().getPlainText(), [
    editorState,
  ]);

  const handleKeyCommand = useCallback(
    (command: string): any => {
      if (command === 'save') {
        onSubmit(text);
        return 'handled';
      }
      return 'not-handled';
    },
    [text],
  );

  useEffect(() => {
    editorRef.current?.focus();
  }, []);
  return (
    <div className="editor">
      <div className="editor-details">
        <DraftEditor
          ref={editorRef}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          onChange={setEditorState}
        />
        <div className="editor-assign">
          <button className="editor-assign-due">日程安排</button>
        </div>
      </div>
      <div className="editor-actions">
        <Button
          className="editor-submit"
          type="primary"
          disabled={!text}
          onClick={() => {
            onSubmit(text);
          }}
        >
          添加任务
        </Button>
        <Button
          className="editor-cancel"
          type="link"
          onClick={() => {
            onCancel();
          }}
        >
          取消
        </Button>
        <div className="editor-sub-actions">
          <button>project</button>
          <button>Tag</button>
          <button>Order</button>
          <button>tip</button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
