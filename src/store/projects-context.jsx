import { createContext, useState } from "react"


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

export default function ProjectsContextProvider({children}) {
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
