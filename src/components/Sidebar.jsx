import { useContext } from 'react';
import { ProjectsContext } from '../store/projects-context';
import Button from './Button';

export default function Sidebar() {
  const { projects, startAddProject, selectProject, selectedProjectId } = useContext(ProjectsContext);

  return (
    <aside className="flex flex-col w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="font-bold mb-8 uppercase md: text-xl text-stone-200">
        Your projects
      </h2>
      <div>
        <Button 
          onClick={startAddProject}
        >
          + Add project
        </Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClasses = 'w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800'

          if (project.id === selectedProjectId) {
            cssClasses += ' bg-stone-800 text-stone-200'
          } else {
            cssClasses += ' text-stone-400'
          }

          return (
            <li key={project.id}>
              <button 
                onClick={() => selectProject(project.id)}
                className={cssClasses}
              >
                {project.title}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}