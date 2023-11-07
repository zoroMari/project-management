import Sidebar from './components/Sidebar';
import NewProject from './components/NewProject';
import { useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';


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

  function handleSelectProject(projectId) {
    setProjectsState((prev) => {
      return {
        ...prev, 
        selectedProjectId: projectId,
      }
    });
  }

  const selectedProject = projectsState.projects.find(item => item.id === projectsState.selectedProjectId);

  function handleDeleteProject() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((item) => item.id !== projectsState.selectedProjectId),
      }
    })
  }

  let content = <SelectedProject 
    project={selectedProject} 
    onDeleteProject={handleDeleteProject}
  />

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onSaveNewProject={handleSaveNewProject} onCancelNewProject={handleCancelNewPr} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar 
        projects={projectsState.projects} 
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
