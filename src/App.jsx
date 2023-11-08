import Sidebar from './components/Sidebar';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';
import ProjectsContextProvider, { ProjectsContext } from './store/projects-context';
import { useContext } from 'react';

function App() {
  const {projects, selectedProjectId, tasks} = useContext(ProjectsContext);
  
  let content = <SelectedProject 
    project={projects.find(item => item.id === selectedProjectId)} 
    tasks={tasks.filter((task) => task.projectId === selectedProjectId)}
  />

  if (selectedProjectId === null) {
    content = <NewProject />;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar />
      {content}
    </main>
  );
}

export default App;
