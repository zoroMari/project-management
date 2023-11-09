import { createContext, useState } from "react";

export const ProjectsContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  startAddProject: () => {},
  saveNewProject: () => {},
  cancelNewProject: () => {},
  selectProject: () => {},
  deleteProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
});

const storageKey = 'projectsStorage';

export default function ProjectsContextProvider({children}) {
  let defaultProjectsState = {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  };

  if (localStorage.getItem(storageKey)) {
    const storageState = JSON.parse(localStorage.getItem(storageKey));
    defaultProjectsState = {...storageState};
  }

  const [projectsState, setProjectsState] = useState(defaultProjectsState);

  function handleStartAddProject() {
    localStorage.setItem(storageKey, JSON.stringify({...projectsState, selectedProjectId: null,}));

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
      const newState = {
        ...prev,
        projects: [...prev.projects, newProject],
        selectedProjectId: newProject.id,
      }

      localStorage.setItem(storageKey, JSON.stringify({...newState}));
      return newState;
    })
  }

  function handleCancelNewPr() {
    localStorage.setItem(storageKey, JSON.stringify({...projectsState, selectedProjectId: undefined,}));

    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
      }
    })
  }

  function handleSelectProject(projectId) {
    localStorage.setItem(storageKey, JSON.stringify({...projectsState, selectedProjectId: projectId,}));

    setProjectsState((prev) => {
      return {
        ...prev, 
        selectedProjectId: projectId,
      }
    });
  }

  function handleDeleteProject() {
    localStorage.setItem(storageKey, JSON.stringify({...projectsState, selectedProjectId: undefined,}));

    setProjectsState((prev) => {
      const newState = {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((project) => project.id !== projectsState.selectedProjectId),
        tasks: prev.tasks.filter((task) => task.projectId !== projectsState.selectedProjectId),
      }

      localStorage.setItem(storageKey, JSON.stringify({...newState}));
      return newState;
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

      const newState = {
        ...prev,
        tasks: [...prev.tasks, newTask],
      }

      localStorage.setItem(storageKey, JSON.stringify({...newState}));
      return newState;
    })
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prev) => {
      const newState = {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== taskId),
      }

      localStorage.setItem(storageKey, JSON.stringify({...newState}));
      return newState;
    })
  }


  const projectCtxValue = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    startAddProject: handleStartAddProject,
    saveNewProject: handleSaveNewProject,
    cancelNewProject: handleCancelNewPr,
    selectProject: handleSelectProject,
    deleteProject: handleDeleteProject,
    addTask: handleAddNewTask,
    deleteTask: handleDeleteTask,
  } 


  return (
    <ProjectsContext.Provider value={projectCtxValue}>
      {children}
    </ProjectsContext.Provider>
  )
}
