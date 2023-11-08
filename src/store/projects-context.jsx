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

const storageKey = {
  projects: 'myProjects',
  tasks: 'myTasks',
  id: 'selectedProjectId',
}

export default function ProjectsContextProvider({children}) {
  const defaultProjectsState = {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  };

  if (localStorage.getItem(storageKey.projects)) {
    const projects = JSON.parse(localStorage.getItem(storageKey.projects));
    defaultProjectsState.projects = projects.length > 0 ? [...projects] : [];
  }

  if (localStorage.getItem(storageKey.tasks)) {
    const tasks = JSON.parse(localStorage.getItem(storageKey.tasks));
    defaultProjectsState.tasks = tasks.length > 0 ? [...tasks] : [];
  }

  if (localStorage.getItem(storageKey.id) || localStorage.getItem(storageKey.id) === undefined) {
    if (localStorage.getItem(storageKey.id) === 'undefined') defaultProjectsState.selectedProjectId = undefined;
    else defaultProjectsState.selectedProjectId = JSON.parse(localStorage.getItem(storageKey.id));
  }

  const [projectsState, setProjectsState] = useState(defaultProjectsState);

  function handleStartAddProject() {
    localStorage.setItem(storageKey.id, JSON.stringify(null));

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

      localStorage.setItem(storageKey.projects, JSON.stringify([...newState.projects]));
      localStorage.setItem(storageKey.id, JSON.stringify(newState.selectedProjectId));

      return newState;
    })
  }

  function handleCancelNewPr() {
    localStorage.setItem(storageKey.id, JSON.stringify(undefined));

    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
      }
    })
  }

  function handleSelectProject(projectId) {
    localStorage.setItem(storageKey.id, JSON.stringify(projectId));

    setProjectsState((prev) => {
      return {
        ...prev, 
        selectedProjectId: projectId,
      }
    });
  }

  function handleDeleteProject() {
    localStorage.setItem(storageKey.id, JSON.stringify(undefined));

    setProjectsState((prev) => {
      const newState = {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((project) => project.id !== projectsState.selectedProjectId),
        tasks: prev.tasks.filter((task) => task.projectId !== projectsState.selectedProjectId),
      }

      localStorage.setItem(storageKey.projects, JSON.stringify([...newState.projects]));

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

      localStorage.setItem(storageKey.tasks, JSON.stringify([...newState.tasks]));
      return newState;
    })
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prev) => {
      const newState = {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== taskId),
      }

      localStorage.setItem(storageKey.tasks, JSON.stringify([...newState.tasks]));
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
