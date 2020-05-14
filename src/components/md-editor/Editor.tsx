import React, { useState, useCallback, useEffect } from 'react';
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
  getDefaultKeyBinding,
  RawDraftContentState,
} from 'draft-js';

function keyBindingFn(e: any): string {
  if (e.keyCode === 13 /* `Enter` key */) {
    return 'save';
  }
  return getDefaultKeyBinding(e) as any;
}

interface IProps {
  placeholder?: string;
  content?: RawDraftContentState;
  onChange?: (content: RawDraftContentState) => void;
}

const MDEditor: React.FC<IProps> = ({ placeholder, content, onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = useCallback((command: string): any => {
    if (command === 'save') {
      // handleSubmit();
      return 'handled';
    }
    return 'not-handled';
  }, []);

  const handleBlur = useCallback(() => {
    const contentBlocks = editorState.getCurrentContent();
    console.log(convertToRaw(contentBlocks));
    onChange?.(convertToRaw(contentBlocks));
  }, [editorState]);

  useEffect(() => {
    if (content) {
      const contentState = convertFromRaw(content);
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [content]);

  return (
    <div className="md-editor">
      <Editor
        placeholder={placeholder}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBindingFn}
        onChange={setEditorState}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default MDEditor;
