import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/reducer';
import Input from 'src/components/input';

const Projects: React.FC = () => {
  const { projects } = useSelector((state: RootState) => state.menus);
  return (
    <div>
      <Input />
      <ul>
        {projects.map((project) => (
          <li
            data-popover-closeable
            onClick={() => {
              console.log(project.id);
            }}
            key={project.id}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
