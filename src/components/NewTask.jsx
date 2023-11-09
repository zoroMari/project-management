import { useContext, useRef } from "react";
import { ProjectsContext } from "../store/projects-context";

export default function NewTask() {
  const taskInput = useRef();
  const { addTask } = useContext(ProjectsContext);

  function handleAddTask() {
    if (taskInput.current.value.trim() === '') return;

    addTask(taskInput.current.value);
    taskInput.current.value = '';
  }


  return (
    <div className="flex items-center gap-4">
      <input ref={taskInput} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
      <button 
        className="text-stone-700 hover:text-stone-950"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  )
}