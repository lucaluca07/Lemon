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
import Popover from 'src/components/popover';
import Button from 'src/components/button';
import useProject from 'src/hooks/useProject';
import Projects from './Projects';

import 'draft-js/dist/Draft.css';

interface IProps {
  onSubmit: (params: {
    title: string;
    projectId: string;
    tags?: string[];
    date?: number;
  }) => void;
  onCancel: () => void;
  // value: string;
}

interface IProject {
  id: string;
  name?: string;
}

const emptyState = EditorState.createEmpty();

function keyBindingFn(e: any): string {
  if (e.keyCode === 13 /* `Enter` key */) {
    return 'save';
  }
  return getDefaultKeyBinding(e) as any;
}

const Editor: React.FC<IProps> = ({ onSubmit, onCancel }) => {
  const defaultProjectId = useProject();
  const [editorState, setEditorState] = useState(emptyState);
  const [project, setProject] = useState<IProject>({ id: defaultProjectId });
  const editorRef = useRef<any>(null);

  const title = useMemo(() => {
    return editorState.getCurrentContent().getPlainText();
  }, [editorState]);

  const setCurrentProject = ({ id, name }: IProject) => {
    setProject({ id, name });
  };

  const handleSubmit = useCallback(() => {
    onSubmit({ title, projectId: project.id });
    setProject({ id: defaultProjectId });
  }, [title, onSubmit, project]);

  const handleKeyCommand = useCallback(
    (command: string): any => {
      if (command === 'save') {
        handleSubmit();
        return 'handled';
      }
      return 'not-handled';
    },
    [title],
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
          disabled={!title}
          onClick={handleSubmit}
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
          <Popover
            clickContentHide
            style={{ padding: 0 }}
            content={
              <Projects selectedId={project.id} onChange={setCurrentProject} />
            }
          >
            <Button title="选择项目" type="icon">
              <i className="iconfont icon-send" />
            </Button>
          </Popover>
          <Popover content="选择项目">
            <Button title="添加标签" type="icon">
              <i className="iconfont icon-tag1" />
            </Button>
          </Popover>
          <Popover content="选择项目">
            <Button title="设置优先级" type="icon">
              <i className="iconfont icon-priority3" />
            </Button>
          </Popover>
          <Popover content="选择项目">
            <Button title="添加提醒" type="icon">
              <i className="iconfont icon-naozhong" />
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Editor;
