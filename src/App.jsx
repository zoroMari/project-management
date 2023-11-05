import Sidebar from './components/Sidebar';
import NewProject from './components/NewProject';
import { useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';


function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      }
    });
  }

  function handleSaveNewProject(project) {
    const newProject = {
      ...project,
      id: Math.random()
    }

    setProjectsState((prev) => {
      return {
        ...prev,
        projects: [...prev.projects, newProject],
        selectedProjectId: undefined,
      }
    })
  }

  function handleCancelNewPr() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
      }
    })
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onSaveNewProject={handleSaveNewProject} onCancelNewProject={handleCancelNewPr} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar projects={projectsState.projects} onStartAddProject={handleStartAddProject}/>
      {content}
    </main>
  );
}

export default App;
