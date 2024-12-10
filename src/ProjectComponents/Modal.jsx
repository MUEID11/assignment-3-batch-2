import { useState } from "react";

import useTask from "../useTask.jsx";
import SubmitButton from "./SubmitButton.jsx";
import { toast } from "react-toastify";
import useTheme from "../useTheme.jsx";

export default function Modal() {
  const { isEditing, existingTask, editTask, addTask,setShowModal } = useTask();
  const {darkMode} = useTheme();
  // Initialize the state with existing task data or default values
  const [newTask, setNewTask] = useState({
    id: isEditing ? existingTask.id : crypto.randomUUID(),
    title: isEditing ? existingTask.title : "",
    description: isEditing ? existingTask.description : "",
    date: isEditing ? existingTask.date : "",
    category: isEditing ? existingTask.category : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editTask(newTask);
      toast.success(`You have updated your task ${existingTask?.title}`)
    } else {
      addTask(newTask);
      toast.success(`Task added successfully`)
    }
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-900 bg-opacity-10 fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-lg  shadow-xl p-4 max-h-[90vh] overflow-auto ${darkMode ? 'bg-gray-800': 'bg-gray-50'}`}>
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-bold text-green-400">
            {isEditing ? "Edit Task" : "Create Task"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className={`mb-1 block text-sm font-medium ${darkMode ? 'text-gray-300': 'text-gray-700'}`}
              >
                Task Name
              </label>
              <input
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
                value={newTask.title}
                type="text"
                id="taskName"
                name="taskName"
                required
                className={`w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode? 'text-gray-700': 'text-white'}`}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className={`mb-1 block text-sm font-medium text-gray-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Description
              </label>
              <textarea
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                value={newTask.description}
                id="description"
                name="description"
                required
                rows="3"
                className={`w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode? 'text-gray-700': 'text-white'}`}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className={`mb-1 block text-sm font-medium text-gray-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Due Date
              </label>
              <input
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, date: e.target.value }))
                }
                value={newTask.date}
                type="date"
                id="dueDate"
                name="dueDate"
                className={`w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode? 'text-gray-700': 'text-white'}`}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className={`mb-1 block text-sm font-medium text-gray-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Category
              </label>
              <select
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, category: e.target.value }))
                }
                value={newTask.category}
                id="category"
                required
                name="category"
                className={`w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode? 'text-gray-700': 'text-white'}`}
              >
                <option disabled value="">
                  Select a category
                </option>
                <option value="todo">To-Do</option>
                <option value="onprogress">On Progress</option>
                <option value="done">Done</option>
                <option value="revised">Revised</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <SubmitButton
                buttonType={`button`}
                onSmash={() =>setShowModal(false)}
                bgColor={`bg-gray-700`}
                bgHover={`bg-gray-500`}
              >
                Cancel
              </SubmitButton>
              <SubmitButton
                buttonType={`submit`}
                bgColor={`bg-green-500`}
                bgHover={`bg-green-700`}
              >
                {isEditing ? "Edit Task" : "Create Task"}
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
