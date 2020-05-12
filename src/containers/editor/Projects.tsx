import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { RootState } from 'src/store/reducer';
import Input from 'src/components/input';
import Icon from 'src/components/icon';
import { addProject } from 'src/store/menus';

interface IProps {
  onSelectedProject: (param: { id: string; name?: string }) => void;
}

const Projects: React.FC<IProps> = ({ onSelectedProject }) => {
  const [name, setName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const { projects } = useSelector((state: RootState) => state.menus);
  const dispatch = useDispatch();
  const inputRef = useRef<{ focus: () => void }>(null);

  const handleAdd = useCallback(() => {
    const id = String(Date.now());
    setSelectedProject(id);
    dispatch(addProject({ id, name }));
    onSelectedProject({ id, name });
    setName('');
  }, [name, dispatch]);

  const projectList = useMemo(
    () =>
      projects.filter((project) =>
        name ? project.name.includes(name) : projects,
      ),
    [name, projects],
  );

  const isEmpty = useMemo(() => projectList.length === 0, [projectList]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="editor-choose-project">
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="输入一个项目"
        onClick={(e) => e.stopPropagation()}
        style={{
          border: 'none',
          borderBottom: '1px solid #eee',
          height: 32,
          lineHeight: '32px',
        }}
        ref={inputRef}
      />
      {!isEmpty && (
        <ul className="editor-projects">
          {projectList.map((project) => (
            <li
              className={classNames('editor-project', {
                'editor-project-selected': project.id === selectedProject,
              })}
              data-popover-closeable
              onClick={() => {
                const { id, name } = project;
                onSelectedProject({ id, name });
              }}
              key={project.id}
            >
              <span>{project.name}</span>
              <span />
              <span />
            </li>
          ))}
        </ul>
      )}
      {isEmpty && (
        <>
          <span className="editor-project-empty">未找到项目</span>
          <div onClick={handleAdd} className="editor-add-project">
            <Icon type="plus" />
            <span className="editor-add-project-content">{`创建"${name}"`}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
