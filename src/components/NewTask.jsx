import { useRef } from "react";

export default function NewTask({ onAddTask }) {
  const taskInput = useRef();
  function handleAddTask() {
    if (taskInput.current.value.trim() === '') return;

    onAddTask(taskInput.current.value);
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