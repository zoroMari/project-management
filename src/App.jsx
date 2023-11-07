import Sidebar from './components/Sidebar';
import NewProject from './components/NewProject';
import { useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';


function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
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
        selectedProjectId: newProject.id,
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

  function handleDeleteProject() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((project) => project.id !== projectsState.selectedProjectId),
        tasks: prev.tasks.filter((task) => task.projectId !== projectsState.selectedProjectId),
      }
    })
  }

  function handleAddNewTask(task) {
    setProjectsState((prev) => {
      const idForTask = Math.random();

      const newTask = {
        text: task,
        id: idForTask,
        projectId: prev.selectedProjectId,
      }

      return {
        ...prev,
        tasks: [...prev.tasks, newTask],
      }
    })
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prev) => {
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== taskId),
      }
    })
  }

  let content = <SelectedProject 
    project={projectsState.projects.find(item => item.id === projectsState.selectedProjectId)} 
    onDeleteProject={handleDeleteProject}
    tasks={projectsState.tasks.filter((task) => task.projectId === projectsState.selectedProjectId)}
    onAddNewTask={handleAddNewTask}
    onDeleteTask={handleDeleteTask}
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
